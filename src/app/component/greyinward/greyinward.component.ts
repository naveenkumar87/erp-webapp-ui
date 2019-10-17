import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, FilterMetadata } from 'primeng/api'; 
import { Title } from "@angular/platform-browser";
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { GenericService } from "../../service/generic/generic.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-greyinward',
  templateUrl: './greyinward.component.html',
  styleUrls: ['./greyinward.component.scss']
})
export class GreyinwardComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  cols: any[];
  greyinwardList: any[];
  selectedRecord: any;
  loading: boolean = false;
  totalRecords: number;
  isError: boolean = false;
  errorMessage: string;	
  msgs: Message[] = [];
  gridVisible: boolean = true;

  constructor(private titleService: Title, 
  			private messageService: MessageService, private router: Router,
  			private genericService: GenericService, private confirmationService: ConfirmationService) { 

  	this.titleService.setTitle( 'Grey Inward' );
  }

  navigate(url){
  	this.router.navigateByUrl(url);
  }

  editGreyInward(id: number){
    this.navigate('core/greyinward/edit/'+id);
  }

  loadGreyInwardLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.isError = false;
        this.msgs = [];

        let from = event.first;
        let rows = event.rows;
        let sortBy = event.sortField == undefined ? '' : event.sortField;
        let sortOrder = event.sortOrder;
        let filters = JSON.stringify(event.filters);
        let globalFilter = event.globalFilter == undefined ? '' : event.globalFilter;

        this.genericService.getList(from, rows, sortBy, sortOrder, filters, globalFilter, 'greyinward', {})
        	.subscribe((response: any) => {
	        	this.loading = false;
	        	this.greyinwardList = response.data;
	        	this.totalRecords = response.count;
	        	//this.messageService.add({severity:'success', summary:'Total records: '+this.totalRecords, detail:'Via MessageService'});
        },
        err => {
        		this.loading = false;
        		this.greyinwardList = [];
        		this.totalRecords = 0;
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

    clone(){

        this.confirmationService.confirm({
            message: 'Are you sure that you want to clone: '+this.selectedRecord.serialNo,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loading = true;
                this.isError = false;
                this.msgs = [];

                this.genericService.post(this.selectedRecord, 'greyinward/clone').subscribe((response: any) => {
                    this.loading = false;
                    let newSerialNo = response.data;
                    this.gridVisible = false;
                    this.selectedRecord = null;
                    setTimeout(() => {
                      this.gridVisible = true
                    }, 0);
                    this.messageService.add({severity:'success', summary:'New Record is generated with serial no: '+newSerialNo, detail:''});
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
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});

  	this.cols = [
  			{ field: 'id', header: 'ID', width: '70px' },
  			{ field: 'serialNo', header: 'Serial No', width: '130px' },
  			{ field: 'lotNo', header: 'Lot No', width: '150px' },
  			{ field: 'biltyNo', header: 'Bilty No', width: '130px' },
  			{ field: 'length', header: 'Length', width: '110px' },
  			{ field: 'bales', header: 'Bales', width: '110px' },
  			{ field: 'quality.name', path: 'quality', header: 'Quality', width: '250px' },

  			{ field: 'voucherNo', header: 'Voucher No', width: '130px' },
  			 			
  			{ field: 'transport.name', path: 'transport', header: 'Transport', width: '130px' },
  			{ field: 'party.name', path: 'party', header: 'Party', width: '260px' },
  			
  			{ field: 'than', header: 'Than', width: '110px' },
  			
  			{ field: 'unit.name', path: 'unit', header: 'Unit', width: '110px' },
  			{ field: 'tp', header: 'TP', width: '90px' },
  			/*{ field: 'notes', header: 'Notes', width: '230px' },*/
  		
  			{ field: 'created_by', header: 'Created By', width: '150px'},
  			{ field: 'created_at', header: 'Created Dt', width: '150px'},
  			{ field: 'updated_by', header: 'Updated By', width: '150px'},
  			{ field: 'updated_at', header: 'Updated Dt', width: '150px'}
  	];

  }

}
