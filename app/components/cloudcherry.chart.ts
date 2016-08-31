import {Directive, ElementRef, Input, OnInit} from 'angular2/core';

@Directive({
    selector: '[cherryChart]',
    inputs: ['chart', 'type', 'barWidth','showLegend','title','showLabel', 'colors', 'interactionEnabled']
})

export class CloudcherryChart implements OnInit{
    constructor(private el: ElementRef) { }
    private chart: any = {};
    private generatedChart: any = {};
    private data : any[];
    private type: string;
    private showLegend: boolean;
    private barWidth: number;
    private title: string;
    private showLabel: boolean;
    private colors: string[];
    private interactionEnabled : boolean = true;
    
    initChart() {
        this.chart.size = {
            width: this.el.nativeElement.offsetWidth,
            height: this.el.nativeElement.offsetHeight
        };
        this.chart.transition = {
            duration: 1000
        };
        var barWidth = (this.el.nativeElement.offsetWidth * 0.75/((this.chart.data.columns.length-1) * (this.chart.data.columns[0].length-1)));
        this.chart.bar = {
            width: this.barWidth == undefined ? (barWidth < 30 ? barWidth : 20) : (barWidth < this.barWidth ? barWidth : this.barWidth)
        };
        this.chart.data.type = this.type;
        this.chart.legend = {show: this.showLegend};
        this.chart.donut = {
            title: this.title,
            label: {
                show: this.showLabel
            }
        };
        this.chart.interaction = {
            enabled : this.interactionEnabled
        };
        if(this.colors != null)
            this.chart.color = {
                pattern: this.colors
            };

        this.generatedChart = c3.generate(this.chart);
    }
    
    mapDataForOthers() {
        var column = [];
        var that = this;
        jQuery.each(this.chart.data.columns,function(ind, data){
            if(ind != 0)
                column.push(data[1]);
            else
                column.push(that.chart.donut.title);
        });
        return [this.chart.data.columns[0], column];
    }
    
    mapDataForPie() {
       var column = [this.chart.data.columns[0]];
       var that = this;
       jQuery.each(this.chart.data.columns[0],function(ind, data){
           
               column.push([that.chart.data.columns[0][ind], that.chart.data.columns[1][ind]])
       });
       return column;
    }
    
    ngOnInit() {
        $(this.el.nativeElement).empty();
        this.chart = jQuery.extend({}, this.chart);
        this.chart.bindto = this.el.nativeElement;
        if(["pie","donut"].indexOf(this.type) != -1)
            this.chart.data.columns = this.mapDataForPie();
        this.initChart();
        var that = this;
        $(window).bind("resize",function(){
            that.generatedChart.resize({
                width: that.el.nativeElement.offsetWidth,
                height: that.el.nativeElement.offsetHeight
            });
        });
    }
    
    ngOnChanges(change){
        
        if(this.generatedChart != undefined && Object.keys(this.generatedChart).length > 0){
            if(change.showLegend != null){
                //this.initChart();
                if(change.showLegend.currentValue)
                    this.generatedChart.legend.show();
                else
                    this.generatedChart.legend.hide();
            }
            
            if(change.type != undefined){
                this.chart.data.type = change.type.currentValue;
                if(["pie","donut"].indexOf(change.type.previousValue) != -1 && ["pie","donut"].indexOf(change.type.currentValue) == -1){
                    this.chart.data.columns = this.mapDataForOthers();
                    this.generatedChart.destroy();
                    this.initChart();
                }
                else if(["pie","donut"].indexOf(change.type.previousValue) == -1 && ["pie","donut"].indexOf(change.type.currentValue) != -1){
                    this.chart.data.columns = this.mapDataForPie();
                    this.generatedChart.destroy();
                    this.initChart();
                }
                else
                    this.generatedChart.transform(change.type.currentValue);
            }
            if(change.chart != undefined){
                this.chart.data.columns = change.chart.currentValue.data.columns;
                this.generatedChart.load({
                    columns: change.chart.currentValue.data.columns,
                    unload: true
                });
            }
        }
    }
}