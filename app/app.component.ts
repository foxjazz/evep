import { Component, OnInit} from '@angular/core';
import {Region} from './region';
//import {IRegions} from './IRegions';
//import {ISystems} from './ISystems';
import {ISystem} from './ISystem';
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
    <div class="row">
      <div class="col-xs-4">
      <ul class=heroes>
          <li *ngFor="let Region of Regs" [class.selected]="hero === selectedHero" (click)="onSelectRegion(Region)">
           <span class="badge">{{Region.id_str}}</span> {{ Region.name }}
            </li>
      </ul>
      </div>
      <div class="col-xs-4">
        <ul>
          <li *ngFor="let System of avSystems">
            {{ System.location.name }} 
            </li>
        </ul>
      </div>
  </div>
  <h2> loading status = {{loaded}} </h2>
    `,
    styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: black;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: #FF4444;
    }
    .heroes li:hover {
      color: #FFFF44;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
    providers: [HTTPEveService, HTTP_PROVIDERS]
})
export class AppComponent implements OnInit {
    public title: string = 'Regions List';
    private errorMessage: string = '';
    public Regs: Array<Region>;
    private loaded = false;
    public avSystems: Array<ISystem>;
    private selRegion: Region;
      constructor(private eveService: HTTPEveService) { }
      
     public onSelectRegion(region: Region){
       this.selRegion = region;
       this.eveService.getSystems(this.selRegion.id_str).subscribe(res => {
         this.avSystems = res.items;
       })
        
      }
     getRegions(){
         //this.regions = localforage.getItem("Regions");
         this.eveService.getRegions().subscribe(res => {
                this.Regs =  res.items.filter(function(el: Region): boolean{
                  if(isNaN(+el.name.slice(-1)))
                  {
                   return true;
                  }
                });
                
                if (this.Regs.length > 0){
                  this.loaded = true;
                }
                //.filter(function (item: any) {
                  //  if (this.isNumeric(item.name.substring(item.name.length - 1)) === false){
                    //    return item;
                    //}
                //});
            });
        
     }

     ngOnInit() {
    this.getRegions();
  }
}
