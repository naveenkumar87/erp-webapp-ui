import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

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

  save(entity: any, url: string): Observable<any>{
    return this.http.post(this.baseUrl+url, entity, this.httpOptions);
  }

  post(entity: any, url: string): Observable<any>{
    return this.http.post(this.baseUrl+url, entity, this.httpOptions);
  }

  get(id: number, url: string){
    let tempUrl = this.baseUrl+url;
    if(id){
        tempUrl = tempUrl + '/'+id;
    }
    return this.http.get<any>(tempUrl, {
      params: {}
    })
  }

  getList(from: any, rows: any, sortBy: any, sortOrder: any, filter: any, 
  					globalFilter: any, url: string, additionalParam: any){

  	/*if(additionalParam){
  		additionalParam = JSON.parse(additionalParam);
  	}*/
  	return this.http.get(this.baseUrl+url, {
  		params: Object.assign({
  			"from": from,
  			"rows": rows,
  			"sortBy": sortBy,
  			"sortOrder": sortOrder,
  			"filter": filter,
  			"globalFilter": globalFilter
  		}, additionalParam)	
  	})
  }
}
