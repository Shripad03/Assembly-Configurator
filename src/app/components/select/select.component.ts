import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends SelectControlValueAccessor {
  @Input() parentForm: any;
  @Input() options: IOptions[] = []; // TODO: Need to write interface for this
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() formControlName: string = '';
  @Input() requiredMsg: string = 'Required';
}

interface IOptions {
  label: string;
  value: string | number;
  disabled?: boolean;
}
