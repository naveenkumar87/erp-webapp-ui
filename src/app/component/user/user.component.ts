import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from "../../service/user/user.service";
import { LazyLoadEvent, FilterMetadata } from 'primeng/api'; 
import { Title } from "@angular/platform-browser";
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  cols: any[];
  users: User[];
  loading: boolean = false;
  totalRecords: number;
  isError: boolean = false;
  errorMessage: string;

  constructor(private userService: UserService, private titleService: Title, 
  			private messageService: MessageService, private router: Router) { 
  	this.titleService.setTitle( 'User' );
  }

  navigate(url){
  	this.router.navigateByUrl(url);
  }

  ngOnInit() {

  	this.cols = [
  			{ field: 'id', header: 'ID', width: '7%' },
  			{ field: 'name', header: 'Name', width: '18%' },
  			{ field: 'username', header: 'User Name', width: '17%' },
  			{ field: 'email', header: 'Email', width: '20%' },
  			{ field: 'created_at', header: 'Created Date', width: '18%' },
  			{ field: 'active', header: 'Active', width: '10%' }
  	];

  }

  editUser(id: number){
    this.navigate('user/edit/'+id);
  }

  loadUsersLazy(event: LazyLoadEvent) {
        this.loading = true;
        this.isError = false;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        
        console.log(event);

        let from = event.first;
        let rows = event.rows;
        let sortBy = event.sortField == undefined ? '' : event.sortField;
        let sortOrder = event.sortOrder;
        let filters = JSON.stringify(event.filters);
        let globalFilter = event.globalFilter == undefined ? '' : event.globalFilter;

        this.userService.getUsers(from, rows, sortBy, sortOrder, filters, globalFilter).subscribe((response: any) => {
        	this.loading = false;
        	this.users = response.data;
        	this.totalRecords = response.count;
        	this.messageService.add({severity:'success', summary:'Total users: '+this.totalRecords, detail:'Via MessageService'});
        },
        err => {
        		this.loading = false;
        		this.users = [];
        		this.totalRecords = 0;
        		this.isError = true;
        		this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        		if(err.error && err.error.message){
        			this.errorMessage = err.error.message;
        		}else{
        			this.errorMessage = err.message;
        		}
        		
        	});
            
    }

}
