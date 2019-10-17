import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from "../../../service/user/user.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  msgs: Message[] = [];
  user = new User();
  blockSpace: RegExp = /^[^<>*!&$#*%\s]+$/;
  userId: number;
  title: string = 'Add User';

  loading: boolean = false;
  errorMessage: string;
  isError: boolean = false;
  isEdit: boolean = false;
  

  constructor(private titleService: Title, private router: Router, private userService: UserService,
  					private _route: ActivatedRoute) { 
  	this.titleService.setTitle( 'Add/Edit User' );
  }

  navigate(url){
  	this.router.navigateByUrl(url);
  }

  saveUser(){
  	this.loading = true;
  	this.isError = false;
  	this.blockUI.start('Loading...');
  	this.msgs = [];
  	this.userService.saveUser(this.user).subscribe((response: any) => {
        	this.loading = false;
        	this.router.navigateByUrl('/user');
        	this.blockUI.stop();
        	//this.messageService.add({severity:'success', summary:'Total users: '+this.totalRecords, detail:'Via MessageService'});
        },
        err => {
        		this.loading = false;
        		this.isError = true;
        		this.blockUI.stop();
        		//this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        		if(err.error && err.error.message){
        			this.errorMessage = err.error.message;
        		}else{
        			this.errorMessage = err.message;
        		}
        		this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
    	});
  }

  loadUser(){
  	this.loading = true;
    this.isError = false;
  	this.blockUI.start('Loading...');
  	this.userService.getUser(this.userId).subscribe((response: any) => {
  		this.user = response.data;
  		this.loading = false;
  		this.blockUI.stop();
  	},err => {
        		this.loading = false;
        		this.isError = true;
        		this.blockUI.stop();
        		//this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        		if(err.error && err.error.message){
        			this.errorMessage = err.error.message;
        		}else{
        			this.errorMessage = err.message;
        		}
        		this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
    	});
  }

  ngOnInit() {
  	this.userId = parseInt(this._route.snapshot.paramMap.get('id'));

  	if(this.userId){
    	this.isEdit = true;
    	this.title = 'Edit User';
    	this.loadUser();
    }else{
    	this.user.setActive(true);
    }

  }

}
