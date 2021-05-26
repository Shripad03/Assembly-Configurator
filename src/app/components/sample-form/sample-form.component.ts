import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { markFormGroupTouched } from 'src/app/utils';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
})
export class SampleFormComponent {
  sampleForm: FormGroup;

  genderOptions = [
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
    { label: 'Other', value: 'o' },
  ];

  constructor(private fb: FormBuilder) {
    this.sampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      subjects: this.fb.array([this.createSubjects(),this.createSubjects()]),
      desc: '',
      gender: new FormControl('', Validators.required),
    });
  }

  get subjects(): FormArray {
    return this.sampleForm.get('subjects') as FormArray;
  }

  createSubjects(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit(evt: any) {
    markFormGroupTouched(this.sampleForm);
    console.log('onsubmit', this.sampleForm.value);
  }
}
