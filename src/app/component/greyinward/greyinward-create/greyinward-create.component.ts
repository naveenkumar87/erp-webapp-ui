import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
//import { User } from '../../../models/user.model';
import { UserService } from "../../../service/user/user.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from 'primeng/components/common/api';
import { GenericService } from "../../../service/generic/generic.service";
import { Observable, forkJoin } from 'rxjs';
import { DialogService } from 'primeng/api';
import { PartySearchComponent } from '../../party/party-search/party-search.component';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-greyinward-create',
  templateUrl: './greyinward-create.component.html',
  styleUrls: ['./greyinward-create.component.scss'],
  providers: [DialogService]
})
export class GreyinwardCreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  msgs: Message[] = [];
  greyInward: any = {};
  greyinwardId: number;
  title: string = 'Add Grey Inward';

  loading: boolean = false;
  errorMessage: string;
  isError: boolean = false;
  isEdit: boolean = false;
  transports: any[] = [];
  units: any[] = [];
  parties: any[] = [];
  serialNos: any[] = [];
  qualities: any[] = [];
  tempSerialNo: string;
  serialNoCopy: string;

  constructor(private titleService: Title, private router: Router, private userService: UserService,
  					private _route: ActivatedRoute, private genericService: GenericService,
  					public dialogService: DialogService, private messageService: MessageService) {
  		this.titleService.setTitle( 'Add/Edit Grey Inward' );
   }

  navigate(url){
    this.router.navigateByUrl(url);
  }

 /* getNextSerialNumber(){
  	this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
  	this.genericService.get(null, 'greyinward/serialNo').subscribe((response: any) => {
	      this.greyInward.serialNo = response.data;
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
  }*/

  loadGreyInward(){
    this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
    this.genericService.get(this.greyinwardId, 'greyinward').subscribe((response: any) => {
      this.greyInward = response.data;
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

  searchPartyDialog(){
  	const ref = this.dialogService.open(PartySearchComponent, {
        header: 'Search Party',
        width: '70%'
    });

    ref.onClose.subscribe((selectedParty: any) => {
        if (selectedParty) {
        	this.greyInward.party = {
        		"id": selectedParty.id,
        		"name": selectedParty.name
    		  }
          //this.messageService.add({severity:'success', summary:'Selected party: '+selectedParty.name, detail:''});
        }
    });

    return false;
  }

  saveGreyInward(){
  	this.msgs = [];
  	if(this.greyInward.party && this.greyInward.party.constructor.name != "Object"){
    	this.msgs.push({severity:'error', summary:'Error Message', detail:'Please select a valid party'});
    	return;
    }

    this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
    //this.msgs = [];
    console.log(this.greyInward);

    this.genericService.save(this.greyInward, 'greyinward').subscribe((response: any) => {
          this.loading = false;
          this.router.navigateByUrl('/core/greyinward');
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
 
  searchParty(event){
      this.msgs = [];
    	let url = 'master/party?qry='+event.query;
    	this.genericService.get(null, url).subscribe(response => {
              this.parties = response.data;
      }, err =>{
      	if(err.error && err.error.message){
            this.errorMessage = err.error.message;
          }else{
            this.errorMessage = err.message;
          }
          this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
  	});
  }

  copyGreyInward(){

    this.blockUI.start('Loading...');

     this.genericService.get(this.greyinwardId, 'greyinward/data/'+this.serialNoCopy)
       .subscribe((res: any) => {
         res.data.serialNo = this.greyInward.serialNo;
         res.data.updated_at = null;
         res.data.updated_by = null;
         res.data.created_at = null;
         res.data.created_by = null;
         res.data.yearFormat = null;
         res.data.id = null;

         this.greyInward = res.data;
         let tempserialNoCopy = this.serialNoCopy;
         //this.msgs.push({severity:'success', summary:'Success: ', detail: tempserialNoCopy+' copied succesfully'});
         this.serialNoCopy = null;
         this.messageService.add({severity:'success', summary:'Success: ', detail: tempserialNoCopy+' copied succesfully'});
         this.msgs = [];
         this.blockUI.stop();
       },
       err =>{
         if(err.error && err.error.message){
            this.errorMessage = err.error.message;
          }else{
            this.errorMessage = err.message;
          }
          this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});

          this.blockUI.stop();
       });

  }

  searchSerialNo(event){
    this.msgs = [];
    let url = 'greyinward/search/serialNo?serialNo='+event.query;
      this.genericService.get(null, url).subscribe(response => {
          this.serialNos = response.data;
      }, err =>{
        if(err.error && err.error.message){
            this.errorMessage = err.error.message;
          }else{
            this.errorMessage = err.message;
          }
          this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
    });
  }

  searchQuality(){
  	this.genericService.get(null, 'master/type/q').subscribe(response => {
  		this.qualities = response.data;
  	}, err =>{
    	if(err.error && err.error.message){
          this.errorMessage = err.error.message;
        }else{
          this.errorMessage = err.message;
        }
        this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
	});
  }

  ngOnInit() {

  	this.greyinwardId = parseInt(this._route.snapshot.paramMap.get('id'));

	    if(this.greyinwardId){
	      this.isEdit = true;
	      this.title = 'Edit Grey Inward';
	      //this.loadGreyInward();
	      this.init();
	    }else{
	      //this.getNextSerialNumber();
	      this.init();
	    }
  
	  /*this.transports = [
	  	{"name": "Air", "id": "air"},
	  	{"name": "Sea", "id": "sea"}
	  ]*/
  }


 /* initCreate(){
  	let serialNoCall = this.genericService.get(null, 'greyinward/serialNo');
  	let transportCall = this.genericService.get(null, 'master/type/t');
  	let unitCall = this.genericService.get(null, 'master/type/u');
  	let qualityCall = this.genericService.get(null, 'master/type/q');

  	this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
    this.msgs = [];

	forkJoin([serialNoCall, transportCall, unitCall, qualityCall]).subscribe((response: any) => {
	      this.greyInward.serialNo = response[0].data;
	      this.transports = response[1].data;
	      this.units = response[2].data;
	      this.qualities = response[3].data;

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

  }*/

  init(){
  	let serialNoCall = this.genericService.get(null, 'greyinward/nextserialNo');
  	let transportCall = this.genericService.get(null, 'master/type/t');
  	let unitCall = this.genericService.get(null, 'master/type/u');
  	let qualityCall = this.genericService.get(null, 'master/type/q');

  	let beCalls = [serialNoCall, transportCall, unitCall, qualityCall]

  	if(this.isEdit){
  		beCalls.push(this.genericService.get(this.greyinwardId, 'greyinward'));
  	}

  	this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
    this.msgs = [];

  	forkJoin(beCalls).subscribe((response: any) => {
	      this.greyInward.serialNo = response[0].data;
	      this.tempSerialNo = response[0].data;
	      this.transports = response[1].data;
	      this.units = response[2].data;
	      this.qualities = response[3].data;

	      if(this.isEdit){
			this.greyInward = response[4].data;
		  }

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
