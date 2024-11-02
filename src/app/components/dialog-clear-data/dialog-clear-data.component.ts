import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

/* DIALOG */
@Component({
  selector: "dialog-clear-data-component",
  templateUrl: './dialog-clear-data.component.html',
  styleUrl: './dialog-clear-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogClearRegistryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
    },
  ) {
  }
}