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
    DataService.prototype.getOrders = function () {
        return this.http.get("/admin/api/order_service.php").map(function (res) { return res.json(); });
    };
    DataService.prototype.getOrder = function (id) {
        return this.http.get("/admin/api/order_service.php?id=" + id).map(function (res) { return res.json(); });
    };
    DataService.prototype.getStates = function () {
        return this.http.get("/admin/api/order_service.php?target=states").map(function (res) { return res.json(); });
    };
    DataService.prototype.getProductPrices = function (product_name) {
        return this.http.get("/admin/api/product_service.php?target=prices&name=" + product_name.toString()).map(function (res) { return res.json(); });
    };
    DataService.prototype.getQuantityDiscount = function (quantity, name) {
        var data = {};
        data['target'] = 'discounts';
        data['name'] = name;
        data['format'] = 'calculate';
        var result = 0;
        $.ajax({
            type: "GET",
            url: "/admin/api/product_service.php",
            data: data,
            async: false,
            success: function (data) {
                $.each(data, function (key, value) {
                    key = parseInt(key);
                    value = parseFloat(value);
                    if (quantity >= key && result < value) {
                        result = value;
                    }
                });
            }
        });
        return result;
    };
    DataService.prototype.calculatePrice = function (target, name, id, squaresize) {
        var data = {};
        data['target'] = target;
        data['name'] = name;
        data['id'] = id;
        data['format'] = 'calculate';
        var result = 0;
        $.ajax({
            type: "GET",
            url: "/admin/api/product_service.php",
            data: data,
            async: false,
            success: function (data) {
                if (Object.keys(data).length > 0) {
                    if (data[squaresize] !== undefined) {
                        result = data[squaresize];
                    }
                    else {
                        var max = 0;
                        var min = Infinity;
                        $.each(data, function (key, value) {
                            key = parseFloat(key);
                            if (key > max) {
                                max = key;
                            }
                            if (key < min) {
                                min = key;
                            }
                        });
                        if (squaresize > max) {
                            result = data[max];
                        }
                        else if (squaresize < min) {
                            result = data[min];
                        }
                        else {
                            var lower = 0;
                            var greater = Infinity;
                            $.each(data, function (key, value) {
                                key = parseFloat(key);
                                if (key > squaresize) {
                                    if (key < greater) {
                                        greater = key;
                                    }
                                }
                                if (key < squaresize) {
                                    if (key > lower) {
                                        lower = key;
                                    }
                                }
                            });
                            var diff = parseFloat(data[lower.toFixed(2)]) - parseFloat(data[greater.toFixed(2)]);
                            var div = diff / (greater - lower);
                            result = parseFloat(data[lower.toFixed(2)]) - div * (squaresize - lower);
                        }
                    }
                }
            }, else: {
                result: result
            }
        });
        return result;
    };
    DataService.prototype.removeOrder = function (id) {
        $.ajax({
            url: "/admin/api/order_service.php?id=" + id,
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