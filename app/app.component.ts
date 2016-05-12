import { Component, OnInit } from '@angular/core';
import {Region} from './region';
import {EveRegionListComponent} from './everegion-list.component';
import { HTTPEveService } from './http-eve.service';
import 'rxjs/Observable';
import {Regions} from './mock-Regions'

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>',
    providers: [HTTPEveService]
})
export class AppComponent implements OnInit {
    private title ="Regions List";
    private regions: Region[];
      constructor(private eveService: HTTPEveService) { }
     
     getRegions(){
         this.eveService.getRegions()
                .subscribe(Regions => this.regions = Regions,
                     error =>  console.log('cannot load regions'));
     }
     ngOnInit() {
    this.getRegions();
  }
}
