import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { UserCreateComponent } from './component/user/user-create/user-create.component';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component';

import { MasterComponent } from './component/master/master.component';
import { MasterCreateComponent } from './component/master/master-create/master-create.component';

import { PartyComponent } from './component/party/party.component';
import { PartyCreateComponent } from './component/party/party-create/party-create.component';

import { GreyinwardComponent } from './component/greyinward/greyinward.component';
import { GreyinwardCreateComponent } from './component/greyinward/greyinward-create/greyinward-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserCreateComponent },

  { path: 'master/party', component: PartyComponent },
  { path: 'master/party/create', component: PartyCreateComponent },
  { path: 'master/party/edit/:id', component: PartyCreateComponent },

  { path: 'gmaster/:type', component: MasterComponent },
  { path: 'gmaster/:type/create', component: MasterCreateComponent },
  { path: 'gmaster/:type/edit/:id', component: MasterCreateComponent },

  { path: 'core/greyinward', component: GreyinwardComponent },
  { path: 'core/greyinward/create', component: GreyinwardCreateComponent },
  { path: 'core/greyinward/edit/:id', component: GreyinwardCreateComponent },

  { path: 'user/change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*export function checkMaster(url: UrlSegment[]){
	return 'master' == url[0].path && /^[a-z]{1}$/.test(url[1].path) ? ({consumed: url}) : null;
	//return url[0].path.startsWith('en') || url[0].path.startsWith('fr') || url[0].path.startsWith('de') || url[0].path.startsWith('nl') ? ({consumed: url}) : null;
}*/