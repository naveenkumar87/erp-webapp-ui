import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
//import { User } from '../../../models/user.model';
import { UserService } from "../../../service/user/user.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from 'primeng/components/common/api';
import { GenericService } from "../../../service/generic/generic.service";

@Component({
  selector: 'app-party-create',
  templateUrl: './party-create.component.html',
  styleUrls: ['./party-create.component.scss']
})
export class PartyCreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  msgs: Message[] = [];
  party: any = {};
  blockSpace: RegExp = /^[^<>*!&$#*%\s]+$/;
  partyId: number;
  title: string = 'Add Party';

  loading: boolean = false;
  errorMessage: string;
  isError: boolean = false;
  isEdit: boolean = false;

  constructor(private titleService: Title, private router: Router, private userService: UserService,
  					private _route: ActivatedRoute, private genericService: GenericService) { 

      this.titleService.setTitle( 'Add/Edit Party' );
  }

  navigate(url){
    this.router.navigateByUrl(url);
  }

  loadParty(){
    this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
    this.genericService.get(this.partyId, 'master/party').subscribe((response: any) => {
      this.party = response.data;
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

  saveParty(){
    this.loading = true;
    this.isError = false;
    this.blockUI.start('Loading...');
    this.msgs = [];
    this.genericService.save(this.party, 'master/party').subscribe((response: any) => {
          this.loading = false;
          this.router.navigateByUrl('/master/party');
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

  ngOnInit() {

    this.partyId = parseInt(this._route.snapshot.paramMap.get('id'));

    if(this.partyId){
      this.isEdit = true;
      this.title = 'Edit Party';
      this.loadParty();
    }else{
      //this.user.setActive(true);
    }

  }

}
