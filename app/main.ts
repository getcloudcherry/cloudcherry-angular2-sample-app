import {bootstrap}    from 'angular2/platform/browser';
import 'rxjs/Rx';
import {Component, provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {Angular2SampleApp} from './app.component';
enableProdMode()
bootstrap(Angular2SampleApp, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);