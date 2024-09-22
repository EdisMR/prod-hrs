import { Component } from '@angular/core';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private _snackbar: SnackbarService
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
}
