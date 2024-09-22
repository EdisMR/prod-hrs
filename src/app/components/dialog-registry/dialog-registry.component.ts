import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdHoursBase } from "../../interfaces/prod-hours-base";
import { FormBuilder, FormGroup } from "@angular/forms";

/* DIALOG */
@Component({
  selector: "dialog-registry-component",
  templateUrl: './dialog-registry.component.html',
  styleUrl: './dialog-registry.component.scss'
})
export class DialogRegistryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      mode: 'create' | 'modify',
      registry: ProdHoursBase
    },
    private _fb: FormBuilder
  ) {

    if (data.mode == 'modify') {
      this.registry = data.registry
    } else {
      this.registry = {
        id: crypto.randomUUID(),
        date_created: new Date().toISOString(),
        date: new Date().toISOString(),
        hours: 0,
        base: "7.25"
      }
    }
    this.buildFormRegistry()
  }

  registry!: ProdHoursBase

  formRegistry!: FormGroup
  buildFormRegistry() {
    this.formRegistry = this._fb.group({
      id: [this.data.registry.id || crypto.randomUUID()],
      date_created: [this.data.registry.date_created || new Date().toISOString()],
      date: [this.data.registry.date || new Date().toISOString()],
      hours: [this.data.registry.hours || 0],
      base: [(this.data.registry.base) || "7.25"],
    })

    this.formRegistry.valueChanges.subscribe((registry) => {
      this.registry = registry
    })
  }

}