import { Injectable } from '@angular/core';
import { organizedHours, organizedHoursByMonth, ProdHoursBase } from '../interfaces/prod-hours-base';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoursManagementService {

  constructor() { }

  private registeredHoursSource: ProdHoursBase[] = [];
  private registeredHoursDispatcher: BehaviorSubject<ProdHoursBase[]> = new BehaviorSubject<ProdHoursBase[]>(this.registeredHoursSource);
  public registeredHours$ = this.registeredHoursDispatcher.asObservable();

  public organizedHoursByMonth$ = this.registeredHoursDispatcher.asObservable().pipe(
    map(registry => {

      /* sort dates */
      registry.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      })

      let organizedHours: organizedHoursByMonth = {};
      registry.forEach(registry => {
        let year = new Date(registry.date).getFullYear().toString();
        let month = (new Date(registry.date).getMonth() + 1).toString();
        if (Number(month) < 10) { month = '0' + month; }

        /* group for 2024 march is 202403 */
        let group: string = year + month;

        if (!organizedHours[group]) {
          organizedHours[group] = {
            groupId: group,
            year: year,
            month: month,
            monthName: new Date(registry.date).toLocaleString('default', { month: 'long' }),
            registry: [registry]
          }
        } else {
          organizedHours[group].registry.push(registry);

          organizedHours[group].registry.sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          })
        }
      })

      return (organizedHours);
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
