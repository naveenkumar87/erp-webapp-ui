import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { GenericService } from "../../../service/generic/generic.service";
import {DynamicDialogRef} from 'primeng/api';

@Component({
  selector: 'app-party-search',
  templateUrl: './party-search.component.html',
  styleUrls: ['./party-search.component.scss']
})
export class PartySearchComponent implements OnInit {

  msgs: Message[] = [];
  party: any = {};
  selectedParty: any = null;
  cols: any[];

  showResult: boolean = false;
  parties: any = [];

  loading: boolean = false;
  totalRecords: number;
  isError: boolean = false;
  errorMessage: string;	

  constructor(private genericService: GenericService, public ref: DynamicDialogRef) { }

  searchParty(){

  	this.loading = true;
    this.isError = false;

    this.genericService.post(this.party, 'greyinward/search/party').subscribe((response: any) => {
    	this.loading = false;
    	this.showResult = true;
    	this.parties = response.data;
  		return;
    }, err => {
            this.loading = false;
            this.isError = true;
            //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            if(err.error && err.error.message){
              this.errorMessage = err.error.message;
            }else{
              this.errorMessage = err.message;
            }
            this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
            return;
      });

  	
  }

  selectParty(){
    console.log(this.selectedParty);
    this.ref.close(this.selectedParty);
  }

  ngOnInit() {


  	this.cols = [
  			{ field: 'id', header: 'ID', width: '50px' },
  			{ field: 'name', header: 'Name', width: '245px' },
  			{ field: 'area', header: 'Area', width: '140px' },
  			{ field: 'address', header: 'Address', width: '220px' },
  			{ field: 'city', header: 'City', width: '130px' },
  			{ field: 'state', header: 'State', width: '130px' },
  			{ field: 'country', header: 'Country', width: '140px' },
  			{ field: 'pinCode', header: 'Pin Code', width: '140px' },
  			{ field: 'mobNo', header: 'Mob No', width: '120px' },
  			{ field: 'email', header: 'Email', width: '130px' },
  			{ field: 'gstNo', header: 'GST No', width: '120px' }
  	];


  }

}
