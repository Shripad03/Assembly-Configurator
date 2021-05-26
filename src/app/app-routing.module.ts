import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { ASSEMBLIES_PATH, CATEGORIES_PATH } from './constants';
import { AssembliesComponent } from './pages/assemblies/assemblies.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: ASSEMBLIES_PATH, pathMatch: 'full' },
      {
        path: ASSEMBLIES_PATH,
        loadChildren: () =>
          import('./pages/assemblies/assemblies.module').then(
            (m) => m.AssembliesModule
          ),
      },
      {
        path: CATEGORIES_PATH,
        loadChildren: () =>
          import('./pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
