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
    DataService.prototype.getShippings = function () {
        return this.http.get("/admin/api/shipping_service.php").map(function (res) { return res.json(); });
    };
    DataService.prototype.getShipping = function (id) {
        return this.http.get("/admin/api/shipping_service.php?id=" + id).map(function (res) { return res.json(); });
    };
    DataService.prototype.updateShipping = function (data) {
        $.ajax({
            type: "POST",
            url: "/admin/api/shipping_service.php",
            data: data,
            async: false,
            success: function (data) {
                console.log(data);
            }
        });
    };
    DataService.prototype.removeShipping = function (id) {
        $.ajax({
            url: "/admin/api/shipping_service.php?id=" + id,
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