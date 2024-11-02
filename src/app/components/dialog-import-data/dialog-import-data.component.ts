import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

/* DIALOG */
@Component({
  selector: "dialog-import-data-component",
  templateUrl: './dialog-import-data.component.html',
  styleUrl: './dialog-import-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogImportRegistryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
    },
  ) {
  }
}