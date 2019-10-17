import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { UserService } from "../../service/user/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: string = null;
  password: string = null;	

  error: boolean = false;
  errorMsg: string = '';

  loading: boolean = false;

  constructor(private titleService: Title, private userService: UserService, private router: Router) { 
  	this.titleService.setTitle( 'Login' );
  }

  login(){
  	this.error = false;
  	this.errorMsg = '';
  	if(!this.username || !this.password){
  		alert('Please enter username and password');
  	}else{
      this.loading = true;
  		this.userService.login(this.username, this.password).subscribe(res =>{
        this.userService.setToken(res.data);
  			this.router.navigateByUrl('/dashboard');
  		},
  		err =>{
        this.loading = false;
  			if(err.status == 0){
  				this.error = true;
  				this.errorMsg = err.message;
  				return;
  			}
  			this.error = true;
  			this.errorMsg = err.error.msg;
  		});
  	}
  }

  ngOnInit() {
  }

}
