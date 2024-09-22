import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdHoursBase } from "../../interfaces/prod-hours-base";

/* DIALOG */
@Component({
  selector: "dialog-remove-component",
  templateUrl: './dialog-remove.component.html',
  styleUrl: './dialog-remove.component.scss'
})
export class DialogRemoveRegistryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      registry: ProdHoursBase
    },
  ) {
  }
}