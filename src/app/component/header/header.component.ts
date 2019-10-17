import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from "../../service/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuitems: MenuItem[];
  profileOptions: MenuItem[];

  constructor(private router: Router, private userService: UserService) { }

  navigate(url){
      this.router.navigateByUrl(url);
  }

  signout(){
      this.userService.removeToken('uid');
      this.navigate('/login')
  }

  ngOnInit() {


  		 this.menuitems = [
            {
                label: 'Admin',
                items: [
                    {
                        label: 'Users',
                        routerLink:"/user"
                    }
                ]
            },
            {
                label: 'Report',
                items: [
                    {
                    	label: 'Dyeing Program'
                    },
                    {
                    	label: 'Fabric Stock'
                    },
                    {
                    	label: 'Grey Inward'
                    },
                    {
                    	label: 'Process Packing'
                    }
                    
                ]
            },
            {
                label: 'Master',
                items: [
                    {
                    	label: 'Party',
                        routerLink:"/master/party"
                    },
                    {
                    	label: 'Quality',
                        routerLink:"/gmaster/q"
                	},
                	{
                		label: 'Transport',
                        routerLink:"/gmaster/t"
                	},
                    {
                        label: 'Unit',
                        routerLink:"/gmaster/u"
                    }
                ]
            },
            {
                label: 'Transaction',
                items: [
                    {
                    	label: 'Dyeing Program'
                    },
                    {
                    	label: 'Fabric Stock'
                    },
                    {
                    	label: 'Grey Inward',
                        routerLink:"/core/greyinward"          	
                    }
                ]
            },
            {
                label: 'Packing',
				items: [
                    {label: 'Process Packing'}
                ]

                
            },
            {separator:true},
            {
                label: 'Client',
                items: [
                    {label: 'Order'}
                ]
            }
        ];


        this.profileOptions = [
            {
                label: 'Change Password', 
                icon: 'pi pi-lock', 
                routerLink: ['/user/change-password']
            },
            {
                label: 'My Activity', 
                icon: 'pi pi-cog'
            },
            {
                label: 'Dashboard', 
                icon: 'fa fa-dashboard', 
                routerLink: ['/dashboard']
            }
        ];
  }

}
