"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// import initVectorMap = require('../../../assets/js/init/initVectorMap.js');
// import initCharts = require('../../../assets/js/init/charts.js');
// import initAniCharts = require('../../../assets/js/init/initAniCharts.js');
// import initTooltips= require('../../../assets/js/init/initTooltips.js');
var data_service_1 = require("./data.service");
var HomeComponent = (function () {
    function HomeComponent(ds) {
        this.ds = ds;
        this.product_reports = [];
        this.blog_reports = [];
        this.inspiration_reports = [];
        this.filter_reports = [];
        this.shipping_reports = [];
        this.browsers = [];
        this.pages = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getProductReports().subscribe(function (res) {
            _this.product_reports = res;
        });
        this.ds.getBlogReports().subscribe(function (res) {
            _this.blog_reports = res;
        });
        this.ds.getInspirationReports().subscribe(function (res) {
            _this.inspiration_reports = res;
        });
        this.ds.getFilterReports().subscribe(function (res) {
            _this.filter_reports = res;
        });
        this.ds.getShippingReports().subscribe(function (res) {
            _this.shipping_reports = res;
        });
        this.ds.getStats().subscribe(function (res) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún",
                "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"];
            _this.orderscount = res['orders'];
            _this.customerscount = res['customers'];
            _this.blogscount = res['blogs'];
            _this.inspirationscount = res['inspirations'];
            _this.browsers = res['browsers'];
            _this.pages = res['pages'];
            var viewsSeries = [];
            var viewsLabels = [];
            $.each(res['views'], function () {
                var dateObj = new Date(this.yearMonth.date);
                viewsLabels.push(monthNames[dateObj.getMonth()] + ' ' + dateObj.getFullYear());
                viewsSeries.push(parseInt(this.visitors));
                viewsSeries.push(parseInt(this.pageViews));
            });
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
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-cmp',
            templateUrl: 'home.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map