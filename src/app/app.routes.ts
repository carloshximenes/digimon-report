import { Routes } from '@angular/router';
import { Result } from './pages/result/result';
import { Form } from './pages/form/form';

export const routes: Routes = [
  { path: '', component: Form },
  { path: 'result', component: Result },
  { path: '**', redirectTo: '' },
];
