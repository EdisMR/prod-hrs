import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { sumarizeInterface } from "../../interfaces/sumarize.interface";

/* DIALOG */
@Component({
  selector: "dialog-result-component",
  templateUrl: './dialog-result.component.html',
  styleUrl: './dialog-result.component.scss'
})
export class DialogResultRegistryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      sumarize: sumarizeInterface
    },
  ) {
  }
}