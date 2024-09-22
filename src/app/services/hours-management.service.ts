import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { organizedHoursByMonth, ProdHoursBase } from '../interfaces/prod-hours-base';

@Injectable({
  providedIn: 'root'
})
export class HoursManagementService {

  constructor() { }

  private registeredHoursSource: ProdHoursBase[] = [];
  private registeredHoursDispatcher: BehaviorSubject<ProdHoursBase[]> = new BehaviorSubject<ProdHoursBase[]>(this.registeredHoursSource);
  public organizedHoursByMonth$: Observable<organizedHoursByMonth[]> = this.registeredHoursDispatcher.asObservable().pipe(
    map(registry => {

      /* Sort all dates, newest dates first */
      registry.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

        registryBaseToOrganize.year = new Date(registry.date).getFullYear().toString();
        registryBaseToOrganize.month = (new Date(registry.date).getMonth() + 1).toString();
        if (Number(registryBaseToOrganize.month) < 10) { registryBaseToOrganize.month = '0' + registryBaseToOrganize.month; }

        /* group for 2024 march is 202403 */
        registryBaseToOrganize.groupId = registryBaseToOrganize.year + registryBaseToOrganize.month;
        registryBaseToOrganize.monthName = new Date(registry.date).toLocaleString('default', { month: 'long' });

        /* Find groups in organizedHoursByMonthResult with same registryBaseToOrganize.groupId to add registry on registryBaseToOrganize.registry array */
        const existingGroup = organizedHoursByMonthResult.find(oh => oh.groupId === registryBaseToOrganize.groupId);
        if (existingGroup) {
          existingGroup.registry.push(registry);
          existingGroup.registry.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else {
          organizedHoursByMonthResult.push({
            ...registryBaseToOrganize,
            registry: [registry]
          });
        }
      })
      console.log('organizedHours by month:', organizedHoursByMonthResult)
      return organizedHoursByMonthResult;
    })
  );

  addNewRegistry(registry: ProdHoursBase) {
    this.registeredHoursSource.push(registry);
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
  }

  removeRegistry(id: string) {
    this.registeredHoursSource = this.registeredHoursSource.filter(registry => registry.id !== id);
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
  }

  modifyRegistry(id: string, registry: ProdHoursBase) {
    this.registeredHoursSource = this.registeredHoursSource.map(reg => {
      if (reg.id === id) {
        return registry;
      }
      return reg;
    });
    this.registeredHoursDispatcher.next(this.registeredHoursSource);
  }

}
