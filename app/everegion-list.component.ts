
import { Component, OnInit } from '@angular/core';
import {Region} from './region';
//import {EveRegionListComponent} from './everegion-list.component';
import { HTTPEveService } from './http-eve.service';


export class EveRegionListComponent implements OnInit {
  constructor (private httpEveService: HTTPEveService) {}
  errorMessage: string;
  regions: Region[];
  ngOnInit() { this.getRegions(); }
  getRegions() {
    this.httpEveService.getRegions()
                     .then(
                       regions => this.regions = regions,
                       error =>  this.errorMessage = <any>error);
  }
  
}