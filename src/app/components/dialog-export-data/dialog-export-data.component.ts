import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

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
  ) {
  }
}