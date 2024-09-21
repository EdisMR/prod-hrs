import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegistryComponent } from '../dialog-registry/dialog-registry.component';
import { HoursManagementService } from '../../services/hours-management.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(
    private _dialog: MatDialog,
    private _hoursManagementService: HoursManagementService
  ) { }

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
}
