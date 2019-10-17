import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  httpOptions : any = {
	  headers: new HttpHeaders({
	    'Content-Type':  'application/json',
	    'Access-Control-Allow-Headers': 'Content-Type',
	    'Access-Control-Allow-Methods': '*',
	    'Access-Control-Allow-Origin': '*'
	  })
	};

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
  	return this.http.post(this.baseUrl+'user/login', {
  		username: username,
  		password: password
  	}, this.httpOptions);
  }

  saveUser(user: User): Observable<any>{
    return this.http.post(this.baseUrl+'user', user, this.httpOptions);
  }

  getUser(id: number){
    return this.http.get<User>(this.baseUrl+'user/'+id, {
      params: {}
    })
  }

  getUsers(from: any, rows: any, sortBy: any, sortOrder: any, filter: any, globalFilter: any){
  	return this.http.get(this.baseUrl+'user', {
  		params: {
  			"from": from,
  			"rows": rows,
  			"sortBy": sortBy,
  			"sortOrder": sortOrder,
  			"filter": filter,
  			"globalFilter": globalFilter
  		}	
  	})
  }

  setToken(token: string){
    localStorage.setItem('uid',token);
  }

  getToken(){
    return localStorage.getItem('uid');
  }

  removeToken(key: string){
    localStorage.removeItem(key);
  }

  validateToken(){
    if(!localStorage.getItem('uid')){
      return null;
    }
    return this.http.post(this.baseUrl+'user/validateToken', {
      token: localStorage.getItem('uid')
    }, this.httpOptions);
  }
}
