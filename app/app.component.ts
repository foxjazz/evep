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
             <li *ngFor="let System of avSystems">
                {{ System.location.name }} 
             </li>
           </ul>
      <ul class=heroes>
          <li *ngFor="let Region of Regs" [class.selected]="hero === selectedHero" (click)="onSelectRegion(Region)">
           <span class="badge">{{Region.id_str}}</span> {{ Region.name }}
          
            </li>
      </ul>
      </div>
  </div>
  <h2> loading status = {{loaded}} </h2>
    `,
    providers: [HTTPEveService, HTTP_PROVIDERS, localStorage]
})

//[provide('localStorage', {useValue: window.localStorage})]

export class AppComponent implements OnInit {
    public title: string = 'Regions List';
    private errorMessage: string = '';
    public Regs: Array<Region>;
    private loaded = false;
    public avSystems: Array<ISystem>;
    private selRegion: Region;
    public selSystems: Array<ISystem>;
      constructor(private eveService: HTTPEveService) { }
      
      private dupe = function(sys: Array<ISystem>): Array<ISystem>
      {
        let res: Array<ISystem>;
        res = new Array<ISystem>();
        let flag = false;
          for ( let i = 0; i < sys.length; i++ ) {
            if (res == null){
              res.push(sys[i])
              i++;
            }
            for (let i1 = 0; i1 < res.length; i1++) {
              if(sys[i].location.name === res[i1].location.name) {
                flag = true;
              }
            }
            if (!flag){
               res.push(sys[i]);
            }
          }
        return res;
      };

    public onSelectStation(system: ISystem){
      if(this.selSystems == null){
        this.selSystems = new Array<ISystem>();
      }
        this.selSystems.push(system);
        localStorage.setItem('Systems', this.selSystems.toString())
    }
    
      public onSelectRegion(region: Region) {
        this.selRegion = region;
        this.eveService.getSystems(this.selRegion.id_str).subscribe(res => {
          this.avSystems = this.dupe(res.items);
        });
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
