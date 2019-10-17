import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, FilterMetadata } from 'primeng/api'; 
import { Title } from "@angular/platform-browser";
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { GenericService } from "../../service/generic/generic.service";
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

  cols: any[];
  parties: any[];
  frozenCols: any[];
  loading: boolean = false;
  totalRecords: number;
  isError: boolean = false;
  errorMessage: string;
  msgs: Message[] = [];
  gridVisible: boolean = true;
  selectedRecord: any;

  constructor(private titleService: Title, 
  			private messageService: MessageService, private router: Router,
  			private genericService: GenericService, private confirmationService: ConfirmationService) { 
  		this.titleService.setTitle( 'Party' );
  }

  navigate(url){
  	this.router.navigateByUrl(url);
  }

  clone(){

        this.confirmationService.confirm({
            message: 'Are you sure that you want to clone: '+this.selectedRecord.name,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loading = true;
                this.isError = false;
                this.msgs = [];

                this.genericService.post(this.selectedRecord, 'master/party/clone').subscribe((response: any) => {
                    this.loading = false;
                    let newSerialNo = response.data;
                    this.gridVisible = false;
                    this.selectedRecord = null;
                    setTimeout(() => {
                      this.gridVisible = true
                    }, 0);
                    this.messageService.add({severity:'success', summary:'New Record is generated successfully', detail:''});
                },
                err => {
                    this.loading = false;
                    this.isError = true;
                    //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
                    if(err.error && err.error.message){
                      this.errorMessage = err.error.message;
                    }else{
                      this.errorMessage = err.message;
                    }
                    this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
                  });
            }
        });

    }


 ngOnInit() {

  	this.cols = [
  			{ field: 'id', header: 'ID', width: '80px' },
  			{ field: 'name', header: 'Name', width: '245px' },
  			{ field: 'panNo', header: 'Pan No', width: '110px' },
  			{ field: 'vatNo', header: 'Vat No', width: '110px' },
  			{ field: 'tanNo', header: 'Tan No', width: '110px' },
  			{ field: 'brokerage', header: 'Brokerage', width: '130px' },
  			{ field: 'address', header: 'Address', width: '220px' },
  			{ field: 'area', header: 'Area', width: '140px' },
  			{ field: 'city', header: 'City', width: '130px' },
  			{ field: 'state', header: 'State', width: '130px' },
  			{ field: 'country', header: 'Country', width: '140px' },
  			{ field: 'pinCode', header: 'Pin Code', width: '140px' },
  			{ field: 'telNo', header: 'Tel No', width: '120px' },
  			{ field: 'mobNo', header: 'Mob No', width: '120px' },
  			{ field: 'email', header: 'Email', width: '130px' },
  			{ field: 'payterm', header: 'PayTerm', width: '150px' },
  			{ field: 'cinNo', header: 'CIN No', width: '110px' },
  			{ field: 'hsnCode', header: 'HSN Code', width: '120px' },
  			{ field: 'gstNo', header: 'GST No', width: '120px' },

  			{ field: 'created_by', header: 'Created By', width: '150px'},
  			{ field: 'created_at', header: 'Created Dt', width: '150px'},
  			{ field: 'updated_by', header: 'Updated By', width: '150px'},
  			{ field: 'updated_at', header: 'Updated Dt', width: '150px'}
  	];

  	this.frozenCols = [
  			{ field: 'name', header: 'Name' }
    ];

  }

  editParty(id: number){
    this.navigate('master/party/edit/'+id);
  }

  loadPartyLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.isError = false;
        this.msgs = [];

        let from = event.first;
        let rows = event.rows;
        let sortBy = event.sortField == undefined ? '' : event.sortField;
        let sortOrder = event.sortOrder;
        let filters = JSON.stringify(event.filters);
        let globalFilter = event.globalFilter == undefined ? '' : event.globalFilter;

        this.genericService.getList(from, rows, sortBy, sortOrder, filters, globalFilter, 'master/party', {})
        	.subscribe((response: any) => {
	        	this.loading = false;
	        	this.parties = response.data;
	        	this.totalRecords = response.count;
	        	//this.messageService.add({severity:'success', summary:'Total users: '+this.totalRecords, detail:'Via MessageService'});
        },
        err => {
        		this.loading = false;
        		this.parties = [];
        		this.totalRecords = 0;
        		this.isError = true;
        		this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        		if(err.error && err.error.message){
        			this.errorMessage = err.error.message;
        		}else{
        			this.errorMessage = err.message;
        		}
        		this.msgs.push({severity:'error', summary:'Error Message', detail:this.errorMessage});
        	});
            
    }


}
