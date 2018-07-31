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
var data_service_1 = require("../data.service");
var router_1 = require('@angular/router');
var OrdersDetailComponent = (function () {
    function OrdersDetailComponent(ds, router, route) {
        this.ds = ds;
        this.router = router;
        this.route = route;
        this.orders = [];
    }
    OrdersDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        this.ds.getOrder(this.route.snapshot.params['id']).subscribe(function (res) {
            _this.order = res;
        });
    };
    OrdersDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getStates().subscribe(function (res) {
            _this.orderstates = res;
        });
    };
    OrdersDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'orders-detail-cmp',
            templateUrl: 'ordersdetail.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
    ], OrdersDetailComponent);
    return OrdersDetailComponent;
}());
exports.OrdersDetailComponent = OrdersDetailComponent;
//# sourceMappingURL=ordersdetail.component.js.map