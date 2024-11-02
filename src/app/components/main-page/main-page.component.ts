import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { organizedHoursByMonth } from '../../interfaces/prod-hours-base';
import { HoursManagementService } from '../../services/hours-management.service';
import { DialogRegistryComponent } from '../dialog-registry/dialog-registry.component';
import { DialogRemoveRegistryComponent } from '../dialog-remove/dialog-registry.component';
import { DialogResultRegistryComponent } from '../dialog-result/dialog-result.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnDestroy {
  constructor(
    private _dialog: MatDialog,
    private _hoursManagementService: HoursManagementService,
    private _cdRef:ChangeDetectorRef
  ) {
    this.organizedRegistrySubscription = this._hoursManagementService.organizedHoursByMonth$
      .subscribe((organizedRegistry) => {
        this.organizedRegistry = organizedRegistry
        this._cdRef.markForCheck()
      })
  }

  displayedColumns: string[] = ['date', 'hours', 'base', 'actions'];

  addRegistry() {
    this._dialog.open(DialogRegistryComponent, {
      data: {
        mode: 'create',
        registry: {}
      }
    }).afterClosed().subscribe((registry) => {
      try {
        if (registry.id) {
          this._hoursManagementService.addNewRegistry(registry)
        }
      } catch (e) {
      }
    })
  }

  modifyRegistry(id: string) {
    this._dialog.open(DialogRegistryComponent, {
      data: {
        mode: 'modify',
        registry: this._hoursManagementService.getOneRegistry(id)
      }
    }).afterClosed().subscribe((registry) => {
      try {
        if (registry.id) {
          this._hoursManagementService.modifyRegistry(id, registry)
        }
      } catch (e) {
      }
    })
  }

  removeRegistry(id: string) {
    this._dialog.open(DialogRemoveRegistryComponent, {
      data: {
        registry: this._hoursManagementService.getOneRegistry(id)
      }
    }).afterClosed().subscribe((registry) => {
      try {
        if (registry === true) {
          this._hoursManagementService.removeRegistry(id)
        }
      } catch (e) {
      }
    })
  }

  watchResult(dataForSumarize: organizedHoursByMonth) {
    this._dialog.open(DialogResultRegistryComponent, {
      data: {
        sumarize: this._hoursManagementService.getSumarizedHoursByMonth(dataForSumarize)
      }
    })
    return
  }

  organizedRegistry: organizedHoursByMonth[] = []
  organizedRegistrySubscription: Subscription

  ngOnDestroy(): void {
    this.organizedRegistrySubscription.unsubscribe()
  }

}
