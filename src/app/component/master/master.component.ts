import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from "../../service/generic/generic.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MasterModel } from "../../models/master.model";
import { LazyLoadEvent, FilterMetadata } from 'primeng/api'; 

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  type: string;
  master: MasterEntity;
  visible: boolean = false;

  cols: any[];
  masterList: MasterModel[];
  loading: boolean = false;
  totalRecords: number;
  isError: boolean = false;
  errorMessage: string;

  constructor(private titleService: Title, private router: Router, private genericService: GenericService,
  					private _route: ActivatedRoute) { 
    this._route.params.subscribe(params => {
      this.setupComponent(params['type']);
    })
  }

  navigate(){
  	let url = 'gmaster/'+this.type+'/create';
  	this.router.navigateByUrl(url);
  }

  edit(id: number){
    this.router.navigateByUrl('gmaster/'+this.type+'/edit/'+id);
  }

  setupComponent(type) {
  	//this.type = this._route.snapshot.paramMap.get('type');
    this.type = type;
  	this.master = <MasterEntity>masters[this.type];

  	this.cols = [
  			{ field: 'id', header: 'ID', width: '6%' },
  			{ field: 'name', header: 'Name', width: '19%' },
  			{ field: 'code', header: 'Code', width: '18%' },
  			{ field: 'created_by', header: 'Created By', width: '13%' },
  			{ field: 'created_at', header: 'Created At', width: '13%' },
  			{ field: 'updated_by', header: 'Updated By', width: '13%' },
  			{ field: 'updated_at', header: 'Updated At', width: '13%' }
  	];

  	this.titleService.setTitle( this.master.title );
    this.updateVisibility();
  }


  loadDataLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.isError = false;

        console.log(event);

        let from = event.first;
        let rows = event.rows;
        let sortBy = event.sortField == undefined ? '' : event.sortField;
        let sortOrder = event.sortOrder;
        let filters = JSON.stringify(event.filters);
        let globalFilter = event.globalFilter == undefined ? '' : event.globalFilter;

        let params = {
        	type: this.type
        }

        this.genericService.getList(from, rows, sortBy, sortOrder, filters, globalFilter, 
                    'master', params).subscribe((response: any) => {
        	this.loading = false;
        	this.masterList = response.data;
        	this.totalRecords = response.count;
        	//this.messageService.add({severity:'success', summary:'Total records: '+this.totalRecords, detail:'Via MessageService'});
        },
        err => {
        		this.loading = false;
        		this.masterList = [];
        		this.totalRecords = 0;
        		this.isError = true;
        		//this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        		if(err.error && err.error.message){
        			this.errorMessage = err.error.message;
        		}else{
        			this.errorMessage = err.message;
        		}
        		
        	});
            
    }

  ngOnInit() {
  }

  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
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