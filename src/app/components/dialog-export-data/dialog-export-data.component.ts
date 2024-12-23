import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdHoursBase } from "../../interfaces/prod-hours-base";
import { HoursManagementService } from "../../services/hours-management.service";
import { SnackbarService } from "../../services/snackbar.service";

/* DIALOG */
@Component({
  selector: "dialog-export-data-component",
  templateUrl: './dialog-export-data.component.html',
  styleUrl: './dialog-export-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogExportRegistryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
    },
    private hoursManagementService: HoursManagementService,
    private _snackbar: SnackbarService
  ) {
    this.downloadInfoAsFile();

    let date = new Date()
    this.filename = `horas-produccion-${date.getFullYear()}${((date.getMonth()+1).toString().padStart(2, "0"))}${date.getDate().toString().padStart(2, "0")}${date.getHours().toString().padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}`
    console.log(this.filename)
  }

  realData: ProdHoursBase[] = [];
  link: string = '';
  filename: string = '';

  downloadInfoAsFile() {
    this.realData = this.hoursManagementService.registeredHoursSource;
    try {
      const blobJSONFile: Blob = new Blob([JSON.stringify(this.realData)], { type: 'application/json' });
      this.link = URL.createObjectURL(blobJSONFile);
    } catch (error) {
      console.error(error);
      this._snackbar.errorFlash('⚠️ Error al convertir los datos en un archivo.');
    }
    if (this.realData.length == 0) {
      this._snackbar.warnFlash('💭 No hay datos disponibles para exportar.');
    }
  }

}