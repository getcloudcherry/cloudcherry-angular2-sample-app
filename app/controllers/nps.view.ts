import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
    selector: 'nps-view',
    templateUrl: 'partials/pages/nps-view.html',
    directives : [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})

export class NPSViewComponent implements OnInit {
    constructor (private _router: Router) {}

    ngOnInit() { 
        
    }
}
