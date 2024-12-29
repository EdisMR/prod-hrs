import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdHoursBase } from "../../interfaces/prod-hours-base";

/* DIALOG */
@Component({
  selector: "dialog-registry-component",
  templateUrl: './dialog-registry.component.html',
  styleUrl: './dialog-registry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
        id: new Date().valueOf().toString(36),
        date_created: new Date().valueOf().toString(),
        date: new Date().valueOf().toString(),
        hours: "0.0000",
        base: "main"
      }
    }
    this.buildFormRegistry()
  }

  registry!: ProdHoursBase

  formRegistry!: FormGroup
  buildFormRegistry() {

    let dateCreated: any = new Date(Number(this.data.registry.date_created)) || new Date()
    let date: any = new Date(Number(this.data.registry.date)) || new Date()

    dateCreated = dateCreated?.toDateString() === 'Invalid Date' ? '' : dateCreated;
    date = date?.toDateString() === 'Invalid Date' ? '' : date;

    this.formRegistry = this._fb.group({
      id: [this.data.registry.id || new Date().valueOf().toString(36)],
      date_created: [dateCreated || new Date()],
      date: [date || ""],
      hours: [this.data.registry.hours || ""],
      base: [(this.data.registry.base) || "main"],
    })

    this.formRegistry.valueChanges.subscribe((registry) => {


      registry.date_created = new Date(Number(registry.date_created)).valueOf().toString()
      registry.date = new Date(Number(registry.date)).valueOf().toString()
      if (registry.hours == "") {
        registry.hours = 0
      }
      this.registry = registry
      this.registry.hours = Number(this.registry.hours).toFixed(4)
    })
  }

}