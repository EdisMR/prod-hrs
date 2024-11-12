import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { organizedHoursByMonth, ProdHoursBase } from '../interfaces/prod-hours-base';
import { sumarizeInterface } from '../interfaces/sumarize.interface';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HoursManagementService {
  private readonly REGISTERED_HOURS_LOCALSTORAGE_NAME = 'registeredHoursv3';

  constructor(
    private _snackbar: SnackbarService
  ) {
    this.registeredHoursSource = JSON.parse(localStorage.getItem(this.REGISTERED_HOURS_LOCALSTORAGE_NAME) || '[]');
    if (this.registeredHoursSource.length) {
      this.registeredHoursDispatcher.next(this.registeredHoursSource);
    }

    this.convertV2toV3();
  }

  private registeredHoursSource: ProdHoursBase[] = []
  private registeredHoursDispatcher: BehaviorSubject<ProdHoursBase[]> = new BehaviorSubject<ProdHoursBase[]>(this.registeredHoursSource);
  public organizedHoursByMonth$: Observable<organizedHoursByMonth[]> = this.registeredHoursDispatcher.asObservable().pipe(
    tap(data => {
      localStorage.setItem(this.REGISTERED_HOURS_LOCALSTORAGE_NAME, JSON.stringify(data));
    }),
    map(registry => {

      /* Sort all dates, newest dates first */
      registry.sort((a, b) => new Date(Number(b.date)).getTime() - new Date(Number(a.date)).getTime());

      /* Group by year and month */
      let organizedHoursByMonthResult: organizedHoursByMonth[] = [];

      registry.forEach(registry => {

        let registryBaseToOrganize: organizedHoursByMonth = {
          groupId: '',
          year: '',
          month: '',
          monthName: '',
          registry: []
        };

        registryBaseToOrganize.year = new Date(Number(registry.date)).getFullYear().toString();
        registryBaseToOrganize.month = (new Date(Number(registry.date)).getMonth() + 1).toString();
        if (Number(registryBaseToOrganize.month) < 10) { registryBaseToOrganize.month = '0' + registryBaseToOrganize.month; }

        /* group for 2024 march is 202403 */
        registryBaseToOrganize.groupId = registryBaseToOrganize.year + registryBaseToOrganize.month;
        registryBaseToOrganize.monthName = new Date(Number(registry.date)).toLocaleString('default', { month: 'long' });

        /* Find groups in organizedHoursByMonthResult with same registryBaseToOrganize.groupId to add registry on registryBaseToOrganize.registry array */
        const existingGroup = organizedHoursByMonthResult.find(oh => oh.groupId === registryBaseToOrganize.groupId);
        if (existingGroup) {
          existingGroup.registry.push(registry);
          existingGroup.registry.sort((a, b) => new Date(Number(b.date)).getTime() - new Date(Number(a.date)).getTime());
        } else {
          organizedHoursByMonthResult.push({
            ...registryBaseToOrganize,
            registry: [registry]
          });
        }
      })
      return organizedHoursByMonthResult;
    })
  );

  addNewRegistry(registry: ProdHoursBase, force = false) {
    /* prevent repeated dates (based on day and month number) */
    if (this.registeredHoursSource.find(reg => new Date(Number(reg.date)).getDate() === new Date(Number(registry.date)).getDate() && new Date(Number(reg.date)).getMonth() === new Date(Number(registry.date)).getMonth())) {
      if (!force) {
        this._snackbar.error('⛔ Ya existe un registro para esta fecha');
      }
      return;
    } else {
      this.registeredHoursSource.push(registry);
      this.registeredHoursDispatcher.next(this.registeredHoursSource);
      this._snackbar.success('✅ Registro creado');
    }
  }

  removeRegistry(id: string) {
    this.registeredHoursSource = this.registeredHoursSource.filter(registry => registry.id !== id);
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
    this._snackbar.success('⚠️ Registro eliminado');
  }

  modifyRegistry(id: string, registry: ProdHoursBase) {
    let efectivelyModified = false
    this.registeredHoursSource = this.registeredHoursSource.map(reg => {
      if (reg.id === id) {
        if (reg.hours === registry.hours && reg.base === registry.base) {
          efectivelyModified = false
          return reg
        } else {
          efectivelyModified = true
          return registry;
        }
      }
      return reg;
    });

    if (efectivelyModified) {
      this.registeredHoursDispatcher.next(this.registeredHoursSource);
      this._snackbar.success('✅ Registro modificado');
    } else {
      this._snackbar.success('Sin cambios 👍');
    }
  }

  getOneRegistry(id: string) {
    return this.registeredHoursSource.find(reg => reg.id === id);
  }

  getSumarizedHoursByMonth(month: organizedHoursByMonth): sumarizeInterface {

    let result: sumarizeInterface = {
      year: '',
      month: '',
      daysRegisteredQuantity: 0,
      daysRegisteredTotal: 0,
      new_albany: {
        targetHours: 0,
        debtHours: 0,
        exceedHours: 0,
        productivity: ''
      },
      costa_rica: {
        targetHours: 0,
        debtHours: 0,
        exceedHours: 0,
        productivity: ''
      },
    }

    result.year = month.year
    result.month = month.monthName
    result.daysRegisteredQuantity = 0
    result.daysRegisteredTotal = 0

    month.registry.forEach(elm => {
      result.daysRegisteredQuantity++
      result.daysRegisteredTotal += elm.hours
      if (elm.base === 'main') {
        result.new_albany.targetHours += (8)
        result.costa_rica.targetHours += (7.25)
      }
      if (elm.base === 'extended') {
        result.new_albany.targetHours += (12)
        result.costa_rica.targetHours += (7.25)
      }
    })
    result.daysRegisteredTotal = Number(result.daysRegisteredTotal.toFixed(4).replace(/\.?0+$/, ""))


    /* Results New Albany */
    result.new_albany.productivity = ((result.daysRegisteredTotal / result.new_albany.targetHours) * 100).toFixed(2)
    let calculus = result.new_albany.targetHours - result.daysRegisteredTotal
    if (calculus > 0) {
      result.new_albany.debtHours = calculus
      result.new_albany.debtHours = Number(result.new_albany.debtHours.toFixed(4).replace(/\.?0+$/, ""))
    }
    if (calculus < 0) {
      result.new_albany.exceedHours = -calculus
      result.new_albany.exceedHours = Number(result.new_albany.exceedHours.toFixed(4).replace(/\.?0+$/, ""))
    }

    /* Results Costa Rica */
    result.costa_rica.productivity = ((result.daysRegisteredTotal / result.costa_rica.targetHours) * 100).toFixed(2)
    calculus = result.costa_rica.targetHours - result.daysRegisteredTotal
    if (calculus > 0) {
      result.costa_rica.debtHours = calculus
      result.costa_rica.debtHours = Number(result.costa_rica.debtHours.toFixed(4).replace(/\.?0+$/, ""))
    }
    if (calculus < 0) {
      result.costa_rica.exceedHours = -calculus
      result.costa_rica.exceedHours = Number(result.costa_rica.exceedHours.toFixed(4).replace(/\.?0+$/, ""))
    }

    return result
  }

  exportHoursDetails() {
    //copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(this.registeredHoursSource)).then(e => {
      this._snackbar.success('✅ Exportación de datos exitosa')
    })
  }

  importHoursDetails() {
    //paste from clipboard
    navigator.clipboard.readText().then(e => {
      //combine data
      let importedData: ProdHoursBase[] = JSON.parse(e)
      importedData.forEach(elm => {
        this.addNewRegistry(elm)
      })

      this._snackbar.success('✅ Importación de datos exitosa')
    })
  }

  convertV2toV3() {
    let dataFromLocalstorage = JSON.parse(localStorage.getItem("registeredHoursv2") || '[]')

    dataFromLocalstorage.forEach((elm: any) => {
      if (elm.base === "7.25") {
        elm.base = 'main'
      }
      if (elm.base === "11.25") {
        elm.base = 'extended'
      }
      this.addNewRegistry(elm, true)
    })

    localStorage.removeItem("registeredHoursv2")
  }

  clearRegistryList() {
    this.registeredHoursSource = []
    this.registeredHoursDispatcher.next(this.registeredHoursSource)
    this._snackbar.success('⚠️ Todos los registros eliminados')
  }

}
