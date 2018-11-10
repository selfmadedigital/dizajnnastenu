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
var QuotesListComponent = (function () {
    function QuotesListComponent(ds) {
        this.ds = ds;
        this.filters = [];
    }
    QuotesListComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    };
    QuotesListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getQuotes().subscribe(function (res) {
            _this.quotes = res;
        });
    };
    QuotesListComponent.prototype.removeQuote = function (id) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť citát ' + id + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeFilter(id);
                _this.ds.showNotification("success", "Citát <b>" + id + "</b> bol úspešne odstránený!");
                $('tr#' + id).hide();
            }
        });
    };
    QuotesListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quoteslist-list-cmp',
            templateUrl: 'quoteslist.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], QuotesListComponent);
    return QuotesListComponent;
}());
exports.QuotesListComponent = QuotesListComponent;
//# sourceMappingURL=quoteslist.component.js.map