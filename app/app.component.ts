import { Component, OnInit } from '@angular/core';
import {Region} from './region';
//import {EveRegionListComponent} from './everegion-list.component';
import { HTTPEveService } from './http-eve.service';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Regions} from './mock-Regions';

@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
    <div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
    `,
    providers: [HTTPEveService, HTTP_PROVIDERS]
})
export class AppComponent implements OnInit {
    public title ="Regions List";
    private errorMessage = '';
    private data = {};
    private regions: Region[];
      constructor(private eveService: HTTPEveService) { }
     
     getRegions(){
         this.data = this.eveService.getRegions();
               
     }
     ngOnInit() {
    this.getRegions();
  }
}
