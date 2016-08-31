import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, AsyncRoute} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";

import {HomeComponent} from './controllers/home';
import {NPSViewComponent} from './controllers/nps.view';

@Component({
    selector: 'angular-2-sample-app',
    template: '<router-outlet></router-outlet>',
    directives: [
        ROUTER_DIRECTIVES, 
        MATERIAL_DIRECTIVES
    ],
    providers: [
        HTTP_PROVIDERS,
        MATERIAL_PROVIDERS
    ]
})

@RouteConfig([
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent,
      useAsDefault: true
    },
    {
      path: '/nps-view',
      name: 'NPS',
      component: NPSViewComponent
    }
])

export class Angular2SampleApp implements OnInit {
    ngOnInit(){
        
    }
 }