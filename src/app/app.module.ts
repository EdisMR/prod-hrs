import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogRegistryComponent } from './components/dialog-registry/dialog-registry.component';
import { MainPageComponent } from './components/main-page/main-page.component';


const materialImports = [
  MatDialogModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    MainPageComponent,
    AppComponent,
    DialogRegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    materialImports,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
