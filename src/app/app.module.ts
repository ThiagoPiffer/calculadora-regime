import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculadoraRegimeComponent } from './calculadora-regime/calculadora-regime.component';

import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ColorPickerModule } from 'primeng/colorpicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox'


@NgModule({
  declarations: [
    AppComponent,
    CalculadoraRegimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,

    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    TableModule,
    DropdownModule,
    InputMaskModule,
    MenuModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    ConfirmPopupModule,
    FileUploadModule,
    SidebarModule,
    AccordionModule,
    StepsModule,
    CalendarModule,
    ListboxModule,
    InputTextareaModule,
    SelectButtonModule,
    ColorPickerModule,
    RadioButtonModule,
    ConfirmDialogModule,
    CheckboxModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
