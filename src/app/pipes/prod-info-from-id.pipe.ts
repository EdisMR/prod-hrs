import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProdHoursBase } from '../interfaces/prod-hours-base';
import { HoursManagementService } from '../services/hours-management.service';

@Pipe({
  name: 'prodInfoFromId'
})
export class ProdInfoFromIdPipe implements PipeTransform {
  constructor(
    private _hoursManagementService: HoursManagementService
  ) { }

  transform(groupId: string, ...args: unknown[]): Observable<ProdHoursBase[]> {
    return this._hoursManagementService.organizedHoursByMonth$.pipe(
      map((organizedRegistry) => {
        let result: ProdHoursBase[] = []
        if (organizedRegistry) {
          let registryIndex = organizedRegistry.findIndex(registry => registry.groupId === groupId)

          if (registryIndex !== -1) {
            result = organizedRegistry[registryIndex].registry || []
          }
        }
        return result
      })
    )
  }

}
