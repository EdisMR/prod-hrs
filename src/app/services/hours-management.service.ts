import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { organizedHoursByMonth, ProdHoursBase } from '../interfaces/prod-hours-base';
import { sumarizeInterface } from '../interfaces/sumarize.interface';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HoursManagementService {

  constructor(
    private _snackbar: SnackbarService
  ) {

    this.registeredHoursSource = JSON.parse(localStorage.getItem('registeredHoursv2') || '[]');
    if (this.registeredHoursSource.length) {
      this.registeredHoursDispatcher.next(this.registeredHoursSource);
    }
  }

  private registeredHoursSource: ProdHoursBase[] = []
  private registeredHoursDispatcher: BehaviorSubject<ProdHoursBase[]> = new BehaviorSubject<ProdHoursBase[]>(this.registeredHoursSource);
  public organizedHoursByMonth$: Observable<organizedHoursByMonth[]> = this.registeredHoursDispatcher.asObservable().pipe(
    tap(data => {
      localStorage.setItem('registeredHoursv2', JSON.stringify(data));
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

  addNewRegistry(registry: ProdHoursBase) {

    /* prevent repeated dates (based on day and month number) */
    if (this.registeredHoursSource.find(reg => new Date(Number(reg.date)).getDate() === new Date(Number(registry.date)).getDate() && new Date(Number(reg.date)).getMonth() === new Date(Number(registry.date)).getMonth())) {
      this._snackbar.error('Ya existe un registro para esta fecha');
      return;
    }


    this.registeredHoursSource.push(registry);
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
  }

  removeRegistry(id: string) {
    this.registeredHoursSource = this.registeredHoursSource.filter(registry => registry.id !== id);
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
    this._snackbar.success('Registro eliminado');
  }

  modifyRegistry(id: string, registry: ProdHoursBase) {
    this.registeredHoursSource = this.registeredHoursSource.map(reg => {
      if (reg.id === id) {
        return registry;
      }
      return reg;
    });
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
    this._snackbar.success('Registro modificado');
  }

  getOneRegistry(id: string) {
    return this.registeredHoursSource.find(reg => reg.id === id);
  }

  getSumarizedHoursByMonth(month: organizedHoursByMonth): sumarizeInterface {

    let result: sumarizeInterface = {} as sumarizeInterface
    result.debtHours = "0"
    result.exceedHours = "0"

    result.year = month.year
    result.month = month.monthName
    result.daysRegisteredQuantity = 0
    result.daysRegisteredTotal = 0
    result.targetHours = 0

    month.registry.forEach(elm => {
      result.daysRegisteredQuantity++
      result.daysRegisteredTotal += elm.hours
      result.targetHours += Number(elm.base)
    })

    result.daysRegisteredTotal = Number(result.daysRegisteredTotal.toFixed(4).replace(/\.?0+$/, ""))

    let calculus = result.daysRegisteredTotal - result.targetHours
    if (calculus < 0) {
      result.debtHours = (calculus * -1).toFixed(4).replace(/\.?0+$/, "")
      result.exceedHours = "0"
    }
    if (calculus > 0) {
      result.debtHours = "0"
      result.exceedHours = calculus.toFixed(4).replace(/\.?0+$/, "")
    }

    return result
  }

  exportHoursDetails() {
    //copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(this.registeredHoursSource)).then(e => {
      this._snackbar.success('Exportación de datos exitosa')
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
    })
  }

  clearRegistryList() {
    this.registeredHoursSource = []
    this.registeredHoursDispatcher.next(this.registeredHoursSource)
    this._snackbar.success('Todos los registros eliminados')
  }

}
