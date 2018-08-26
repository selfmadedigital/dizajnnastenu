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
var http_1 = require("@angular/http");
require('/admin/node_modules/rxjs/add/operator/map');
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.getProducts = function () {
        return this.http.get("/admin/api/product_service.php").map(function (res) { return res.json(); });
    };
    DataService.prototype.getProduct = function (product_name) {
        return this.http.get("/admin/api/product_service.php?name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.getProductMaterials = function (product_name) {
        return this.http.get("/admin/api/product_service.php?target=materials&name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.getProductPrices = function (product_name) {
        return this.http.get("/admin/api/product_service.php?target=prices&name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.getProductDiscounts = function (product_name) {
        return this.http.get("/admin/api/product_service.php?target=discounts&name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.getProductInstallations = function (product_name) {
        return this.http.get("/admin/api/product_service.php?target=installations&name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.getProductFinalisations = function (product_name) {
        return this.http.get("/admin/api/product_service.php?target=finalisations&name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.removeTarget = function (id, target) {
        $.ajax({
            url: "/admin/api/product_service.php?target=" + target + "&id=" + id,
            type: 'DELETE',
            success: function (data) {
                console.log(data);
            }
        });
    };
    DataService.prototype.showNotification = function (type, message) {
        $.notify({
            message: message
        }, {
            type: type,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map