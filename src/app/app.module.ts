import { registerLocaleData } from '@angular/common';
import LocaleEs from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogRegistryComponent } from './components/dialog-registry/dialog-registry.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProdInfoFromIdPipe } from './pipes/prod-info-from-id.pipe';
registerLocaleData(LocaleEs, 'es');

const materialImports = [
  MatDialogModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatTableModule,
]

@NgModule({
  declarations: [
    MainPageComponent,
    AppComponent,
    DialogRegistryComponent,
    ProdInfoFromIdPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    materialImports,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: DateAdapter, useClass: NativeDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
