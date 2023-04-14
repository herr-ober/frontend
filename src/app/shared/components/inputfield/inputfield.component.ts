import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-inputfield',
    templateUrl: './inputfield.component.html',
    styleUrls: ['./inputfield.component.css']
})
export class InputfieldComponent {

    @Input() type: string = "text";

}
