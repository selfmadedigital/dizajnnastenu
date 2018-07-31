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
var OrdersListComponent = (function () {
    function OrdersListComponent(ds) {
        this.ds = ds;
        this.orders = [];
    }
    OrdersListComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    };
    OrdersListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getOrders().subscribe(function (res) {
            _this.orders = res;
        });
        this.ds.getStates().subscribe(function (res) {
            _this.orderstates = res;
        });
    };
    OrdersListComponent.prototype.removeOrder = function (id) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť objednávku číslo ' + id + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result.value) {
                _this.ds.removeFilter(id);
                _this.ds.showNotification("success", "Objednávka číslo <b>" + id + "</b> bola úspešne odstránená!");
                $('tr#' + id).hide();
            }
        });
    };
    OrdersListComponent.prototype.changeOrderState = function (orderid, stateid) {
        var dataorder = {};
        dataorder['target'] = 'state';
        dataorder['orderid'] = orderid;
        dataorder['stateid'] = stateid;
        $.ajax({
            type: "POST",
            url: "/admin/api/order_service.php",
            data: dataorder,
            success: function (data) {
                $('#orders-table tr#' + dataorder['orderid'] + ' .dropdown button span').text(data['state']);
            }
        });
    };
    OrdersListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'orders-list-cmp',
            templateUrl: 'orderslist.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], OrdersListComponent);
    return OrdersListComponent;
}());
exports.OrdersListComponent = OrdersListComponent;
//# sourceMappingURL=orderslist.component.js.map