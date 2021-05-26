import { FormArray, FormGroup } from '@angular/forms';

export function markFormGroupTouched(formGroup: FormGroup | FormArray) {
  if (!formGroup.controls) {
    formGroup.markAsTouched();
  } else {
    (<any>Object).values(formGroup.controls).forEach((control: FormArray) => {
      if (control.controls) {
        markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
