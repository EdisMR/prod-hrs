import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogClearRegistryComponent } from './components/dialog-clear-data/dialog-clear-data.component';
import { DialogExportRegistryComponent } from './components/dialog-export-data/dialog-export-data.component';
import { DialogImportRegistryComponent } from './components/dialog-import-data/dialog-import-data.component';
import { HoursManagementService } from './services/hours-management.service';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private _snackbar: SnackbarService,
    private _hoursSvc: HoursManagementService,
    private _dialog: MatDialog
  ) { }

  currentYear = new Date().getFullYear()

  sharePage() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
      });

    /* open application share windows */
    navigator.share({
      text: "Calculadora de horas de producción",
      url: window.location.href,
      title: 'Calculadora de horas de producción'
    }).then(() => {
      this._snackbar.success('Compartido exitosamente.')
    }).catch((error) => {
      this._snackbar.errorFlash('Ocurrió un error al compartir.')
    });
  }

  exportData() {
    this._dialog.open(DialogExportRegistryComponent).afterClosed().subscribe((result) => {
      if (result && result === true) {
        this._hoursSvc.exportHoursDetails()
      }
    })
  }

  importData() {
    this._dialog.open(DialogImportRegistryComponent).afterClosed().subscribe((result) => {
      if (result && result === true) {
        this._hoursSvc.importHoursDetails()
      }
    })
  }

  clearData() {
    this._dialog.open(DialogClearRegistryComponent).afterClosed().subscribe((result) => {
      if (result && result === true) {
        this._hoursSvc.clearRegistryList()
      }
    })
  }
}
