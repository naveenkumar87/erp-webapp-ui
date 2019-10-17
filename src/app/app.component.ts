import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'erp-webapp-ui';
  loggedIn: boolean = false;

  public constructor(private titleService: Title, private router: Router) {

    router.events.forEach((event) => {
      if(event instanceof NavigationStart){
        if(event.url == '/login' || event.url == '/'){
          this.loggedIn = false;
        }else{
          this.loggedIn = true;
        }
      }
    });

  	this.setTitle("Home Page");
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
