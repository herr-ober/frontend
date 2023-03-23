import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ButtonComponent } from './components/button/button.component';
import { InputfieldComponent } from './components/inputfield/inputfield.component';


@NgModule({
  declarations: [
    ButtonComponent,
    InputfieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ]
})
export class SharedModule {
}
