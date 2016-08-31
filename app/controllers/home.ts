import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

import {CloudcherryChart} from "../components/cloudcherry.chart";

@Component({
    selector: 'home',
    templateUrl: 'partials/pages/home.html',
    directives : [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, CloudcherryChart]
})

export class HomeComponent implements OnInit {
    private chartObj = null;
    private chartType = "line";
    constructor (private _router: Router) {}

    ngOnInit() { 
        this.chartObj = {
            data: {
                columns: [
                    ['Data 1', 30, 200, 100, 400, 150, 250],
                    ['Data 2', 50, 20, 10, 40, 15, 25]
                ]
            }
        };
        var that = this;
        setInterval(function(){
            that.chartType = ["line","bar","area","spline","area-spline"][Math.ceil(Math.random() * 5)];
        }, 3000);
    }
}
