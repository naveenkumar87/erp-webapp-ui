import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { RadioButtonModule, SharedModule } from 'primeng/primeng';
import { InputTextModule, ButtonModule, MenubarModule, CardModule, CheckboxModule, DropdownModule,
   PasswordModule, KeyFilterModule, ProgressSpinnerModule, InputTextareaModule, 
   AutoCompleteModule, TooltipModule, ConfirmDialogModule, SplitButtonModule,
   ToggleButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {DynamicDialogModule} from 'primeng/dynamicdialog';


import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderComponent } from './component/header/header.component';
import { UserComponent } from './component/user/user.component';
import { UserCreateComponent } from './component/user/user-create/user-create.component';

import { TokenInterceptor } from './auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MasterComponent } from './component/master/master.component';
import { MasterCreateComponent } from './component/master/master-create/master-create.component';
import { PartyComponent } from './component/party/party.component';
import { PartyCreateComponent } from './component/party/party-create/party-create.component';
import { GreyinwardComponent } from './component/greyinward/greyinward.component';
import { GreyinwardCreateComponent } from './component/greyinward/greyinward-create/greyinward-create.component';
import { PartySearchComponent } from './component/party/party-search/party-search.component';
import { ChangePasswordComponent } from './component/user/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    UserComponent,
    UserCreateComponent,
    MasterComponent,
    MasterCreateComponent,
    PartyComponent,
    PartyCreateComponent,
    GreyinwardComponent,
    GreyinwardCreateComponent,
    PartySearchComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    SharedModule,
    InputTextModule,
    MenubarModule,
    CardModule,
    TableModule,
    ToastModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    PasswordModule,
    KeyFilterModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    AutoCompleteModule,
    TooltipModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    SplitButtonModule,
    ToggleButtonModule,
    BlockUIModule.forRoot({
      message: 'Loading..'
    })
  ],
  entryComponents: [
        PartySearchComponent
  ],
  providers: [
    Title,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
