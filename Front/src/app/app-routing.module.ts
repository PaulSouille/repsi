import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },  
  { path: 'callback', component: CallbackComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class AppRoutingModule { }
