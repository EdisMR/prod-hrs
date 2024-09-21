import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HoursManagementService } from '../../services/hours-management.service';
import { DialogRegistryComponent } from '../dialog-registry/dialog-registry.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(
    private _dialog: MatDialog,
    private _hoursManagementService: HoursManagementService
  ) {
    this.organizedRegistry = this._hoursManagementService.organizedHoursByMonth$.subscribe((registry) => {
    })
  }

  addRegistry() {
    this._dialog.open(DialogRegistryComponent, {
      data: {
        mode: 'create',
        registry: {}
      }
    }).afterClosed().subscribe((registry) => {
      if (registry.id) {
        this._hoursManagementService.addNewRegistry(registry)
      }
    })
  }

  organizedRegistry
}
