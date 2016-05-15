import { Component, OnInit} from '@angular/core';
import {Region} from './region';
//import {EveRegionListComponent} from './everegion-list.component';
import { HTTPEveService } from './http-eve.service';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {Regions} from './mock-Regions';
//import {localforage} from 'localforage';
// remember to run tsd install package to definitely type these.
// package.json has the dependency list


@Component({
    selector: 'my-app',
    template: `<h1>{{title}}</h1>
    <h2> function counter = {{cntr}}</h2>
    <div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
    <ul>
    <li *ngFor="let Region of eveService.Regions">
      {{ Region.name }}
      </li>
  </ul>
  <h2> is loading = {{eveService.loading}} </h2>
    `,
    providers: [HTTPEveService, HTTP_PROVIDERS]
})
export class AppComponent implements OnInit {
    public title ="Regions List";
    private errorMessage = '';
    public Regs: Array<Region>;
    private cntr = 0;
    private loaded = false;
      constructor(private eveService: HTTPEveService) { }
    
     getRegions(){
         //this.regions = localforage.getItem("Regions");
         this.eveService.getRegions();
         this.Regs = this.eveService.Regions;
         this.loaded = !this.eveService.loading;
     //    localStorage.setItem("Regions",JSON.stringify(this.regions));

         
         
               
     }
     ngOnInit() {
    this.getRegions();
  }
}
