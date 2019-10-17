import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { GenericService } from "../../../service/generic/generic.service";
import { NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  input: any = {};
  title: string = 'Change Password';

  loading: boolean = false;
  isError: boolean = false;
  errorMessage: string;
  msgs: Message[] = [];

  showPasswordState: boolean = true;

  constructor(private titleService: Title, private genericService: GenericService) {
  	this.titleService.setTitle( 'Change Password' );
  }

  save(form: NgForm){
  	let request = {
  		'oldPass': this.input.cpassword,
  		'newPass': this.input.password
  	}

  	this.loading = true;
    this.isError = false;
    this.msgs = [];
    this.blockUI.start('Loading...');

  	this.genericService.post(request, 'user/change-password').subscribe((res: any) => {
  		this.loading = false;
  		console.log(res);
  		form.reset();
  		this.msgs.push({severity:'success', summary:'Success: ', detail:res.msg});
  		this.blockUI.stop();
  	}, err =>{
  		this.loading = false;
		this.isError = true;
		this.blockUI.stop();
		//this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
		if(err.error && err.error.message){
			this.errorMessage = err.error.message;
		}else{
			this.errorMessage = err.message;
		}
		this.blockUI.stop();
		this.msgs.push({severity:'error', summary:'Error Message: ', detail:this.errorMessage});
  	});
  	
  }

  ngOnInit() {
  }

}
