import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { UserService } from "../../service/user/user.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  name: string;

  msgs: Message[] = [];
  loading: boolean = false;
  errorMessage: string;
  isError: boolean = false;

  constructor(private titleService: Title, private userService: UserService) { 
  	this.titleService.setTitle("Dashboard");
  }

  ngOnInit() {
  	this.loading = true;
  	this.isError = false;
  	this.blockUI.start('Loading...');

  	this.userService.getUser(-1).subscribe((response: any) => {
  		this.name = response.data.name;
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

}
