import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatRippleModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogClearRegistryComponent } from './components/dialog-clear-data/dialog-clear-data.component';
import { DialogExportRegistryComponent } from './components/dialog-export-data/dialog-export-data.component';
import { DialogImportRegistryComponent } from './components/dialog-import-data/dialog-import-data.component';
import { DialogRegistryComponent } from './components/dialog-registry/dialog-registry.component';
import { DialogRemoveRegistryComponent } from './components/dialog-remove/dialog-registry.component';
import { DialogResultRegistryComponent } from './components/dialog-result/dialog-result.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProdInfoFromIdPipe } from './pipes/prod-info-from-id.pipe';

// Registra los datos de localización para español
registerLocaleData(localeEs, 'es');

const materialImports = [
  MatDialogModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatTableModule,
  MatSnackBarModule,
  MatIconModule,
  MatTooltipModule,
  MatCardModule,
  MatToolbarModule,
  MatRippleModule,
  MatExpansionModule,
]

@NgModule({
  declarations: [
    MainPageComponent,
    AppComponent,
    DialogRegistryComponent,
    DialogRemoveRegistryComponent,
    DialogResultRegistryComponent,
    ProdInfoFromIdPipe,
    DialogExportRegistryComponent,
    DialogImportRegistryComponent,
    DialogClearRegistryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    materialImports,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: DateAdapter, useClass: NativeDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
