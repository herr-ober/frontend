import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ButtonComponent } from './components/button/button.component';
import { InputfieldComponent } from './components/inputfield/inputfield.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    ButtonComponent,
    InputfieldComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    ModalComponent,
    InputfieldComponent
  ]
})
export class SharedModule {
}
