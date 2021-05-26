import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssembliesComponent } from './assemblies.component';

const routes: Routes = [{ path: '', component: AssembliesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssembliesRoutingModule { }
