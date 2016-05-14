import { Component, OnInit} from '@angular/core';
import {Region} from './region';
//import {EveRegionListComponent} from './everegion-list.component';
import { HTTPEveService } from './http-eve.service';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Regions} from './mock-Regions';
import {localforage} from 'localforage';
// remember to run tsd install package to definitely type these.
// package.json has the dependency list


@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
    <h2> function counter = {{cntr}}</h2>
    <div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
     
    `,
    providers: [HTTPEveService, HTTP_PROVIDERS, localforage]
})
export class AppComponent implements OnInit {
    public title ="Regions List";
    private errorMessage = '';
    private regions = {};
    private cntr = 0;
    
      constructor(private eveService: HTTPEveService) { }
    
     getRegions(){
         this.regions = localforage.getItem("Regions");
         this.eveService.getRegions();
         this.regions = this.eveService.data;
         this.regions = this.eveService.data.items.filter(function (item: any) {
                    var st = item.name.substring(item.name.length - 1);
                    if (jQuery.isNumeric(st)==false)
                        return item;
                });
     //    localStorage.setItem("Regions",JSON.stringify(this.regions));

         
         
               
     }
     ngOnInit() {
    this.getRegions();
  }
}
