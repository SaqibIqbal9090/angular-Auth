import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutComponent } from './components/home/about/about.component';
import { SongComponent } from './components/home/song/song.component';
import { HomeComponent } from './components/home/home.component';
import { AuthguardGuard } from './auth/authguard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',component: HomeComponent, canActivate :[AuthguardGuard],
    children: [
      { path: '', redirectTo: 'songs', pathMatch: 'full' },
      { path: 'about', component: AboutComponent, outlet: 'homeoutlet' },
      { path: 'songs', component: SongComponent, outlet: 'homeoutlet' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
