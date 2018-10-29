import { Component, OnInit } from '@angular/core';
// import initVectorMap = require('../../../assets/js/init/initVectorMap.js');
// import initCharts = require('../../../assets/js/init/charts.js');
// import initAniCharts = require('../../../assets/js/init/initAniCharts.js');
// import initTooltips= require('../../../assets/js/init/initTooltips.js');
import { DataService } from "./data.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'home-cmp',
    templateUrl: 'home.component.html',
    providers: [DataService]
})

export class HomeComponent implements OnInit{
    product_reports : any[] = [];
    blog_reports : any[] = [];
    inspiration_reports : any[] = [];
    filter_reports : any[] = [];
    shipping_reports : any[] = [];
    
    browsers : any[] = [];
    pages : any[] = [];
    
    constructor(private ds: DataService) {}
    
    ngOnInit(){

    }
    
    ngAfterViewInit(): void {
        this.ds.getProductReports().subscribe(res => { 
            this.product_reports = res;
        });
        
        this.ds.getBlogReports().subscribe(res => { 
            this.blog_reports = res;
        });
        
        this.ds.getInspirationReports().subscribe(res => { 
            this.inspiration_reports = res;
        });
        
        this.ds.getFilterReports().subscribe(res => { 
            this.filter_reports = res;
        });
        
        this.ds.getShippingReports().subscribe(res => { 
            this.shipping_reports = res;
        });
        
        this.ds.getStats().subscribe(res => { 
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún",
              "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"];
            
            this.orderscount = res['orders'];
            this.customerscount = res['customers'];
            this.blogscount = res['blogs'];
            this.inspirationscount = res['inspirations'];
            this.browsers = res['browsers'];
            this.pages = res['pages'];
            
            var viewsSeries = [];
            var viewsLabels = [];
            
            $.each(res['views'], function(){
                var dateObj = new Date(this.yearMonth.date);
                viewsLabels.push(monthNames[dateObj.getMonth()] + ' ' + dateObj.getFullYear());
                viewsSeries.push(parseInt(this.visitors));
                viewsSeries.push(parseInt(this.pageViews));
            })
            
            var dataMultipleBarsChart = {
              labels: viewsLabels,
              series: viewsSeries
            };
    
            var optionsMultipleBarsChart = {
                seriesBarDistance: 10,
                axisX: {
                    showGrid: false
                },
                height: '300px'
            };
    
            var responsiveOptionsMultipleBarsChart = [
              ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function (value) {
                    return value[0];
                  }
                }
              }]
            ];
    
            var multipleBarsChart = Chartist.Bar('#visitsChart', dataMultipleBarsChart, optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);
    
            md.startAnimationForBarChart(multipleBarsChart);
        });
    }
}
