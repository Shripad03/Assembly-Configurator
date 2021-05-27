import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { LoaderComponent } from './components/loader/loader.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const materialModules = [
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatListModule,
  PerfectScrollbarModule
];
const sharedModules = [
  CommonModule,
  FormsModule,
  Ng2SearchPipeModule,
  ReactiveFormsModule,
  ...materialModules,
];

const sharedComponents = [
  InputComponent,
  SelectComponent,
  SampleFormComponent,
  LoaderComponent,
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [...sharedModules],
  exports: [...sharedModules, ...sharedComponents],
})
export class SharedModule { }
