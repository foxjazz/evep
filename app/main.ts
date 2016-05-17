import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {PiksComponent} from './pick.component';
import { HTTP_PROVIDERS  } from '@angular/http';
import 'rxjs/add/operator/map';
declare var jQuery:JQueryStatic;
//import 'rxjs/add/operator/toPromise';
bootstrap(AppComponent,  HTTP_PROVIDERS );
//bootstrap(PiksComponent,  HTTP_PROVIDERS );
