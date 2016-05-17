import { Component, OnInit} from '@angular/core';
import {ISystem} from './ISystem';

@Component({
  selector: 'my-mypiks',
  template: `
   <h2> PIKS </h2>
   <button *ngclick="getLocalSystems()"> get local systems</button>
   <ul class=heroes>
             <li *ngFor="let System of selSystems">
                {{ System.location.name }} 
             </li>
           </ul>
  `,
providers: [localStorage]
})

export class PiksComponent implements OnInit{
    public selSystems: Array<ISystem>;
    
    public getLocalSystems = function(){
        this.selSystems = localStorage.getItem('Systems'); 
    }
       ngOnInit() {
        this.getLocalSystems();
  }
}