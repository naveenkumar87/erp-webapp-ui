import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from "../../../service/generic/generic.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MasterModel } from '../../../models/master.model';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-master-create',
  templateUrl: './master-create.component.html',
  styleUrls: ['./master-create.component.scss']
})
export class MasterCreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  msgs: Message[] = [];
  master = new MasterModel();

  type: string;
  masterType: MasterEntity;
  masterId: number;

  loading: boolean = false;
  errorMessage: string;
  isError: boolean = false;
  isEdit: boolean = false;
  title: string;

  constructor(private titleService: Title, private router: Router, private genericService: GenericService,
  					private _route: ActivatedRoute) { 

  }

  navigate(url){
  	this.router.navigateByUrl(url+'/'+this.masterType.type);
  }

  save(){
  	this.loading = true;
  	this.isError = false;
  	this.blockUI.start('Loading...');
  	this.msgs = [];
  	this.genericService.save(this.master, 'master').subscribe((response: any) => {
        	this.loading = false;
        	this.router.navigateByUrl('/gmaster/'+this.masterType.type);
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


  loadMaster(){
  	this.loading = true;
  	this.blockUI.start('Loading...');
  	this.genericService.get(this.masterId, 'master').subscribe((response: any) => {
  		this.master = response.data;
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
  	this.type = this._route.snapshot.paramMap.get('type');
  	this.masterType = <MasterEntity>masters[this.type];
  	console.log(this.masterType);
  	this.title = 'Add '+this.masterType.title;

  	this.titleService.setTitle( 'Add/Edit '+this.masterType.title );

  	this.masterId = parseInt(this._route.snapshot.paramMap.get('id'));

  	if(this.masterId){
    	this.isEdit = true;
    	this.title = 'Edit '+this.masterType.title;;
    	this.loadMaster();
    }else{
      this.master.type = this.masterType.type;
    	//this.user.setActive(true);
    }
  }

}

let masters = {
	"t": {title: "Transport", type: "t"},
  "q": {title: "Quality", type: "q"},
  "u": {title: "Unit", type: "u"}
}

interface MasterEntity {
    type: string;
    title: string;
}
