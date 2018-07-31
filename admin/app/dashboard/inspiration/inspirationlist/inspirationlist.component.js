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
var InspirationListComponent = (function () {
    function InspirationListComponent(ds) {
        this.ds = ds;
        this.inspirations = [];
    }
    InspirationListComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    };
    InspirationListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getInspirations().subscribe(function (res) {
            _this.inspirations = res;
        });
    };
    InspirationListComponent.prototype.removeInspiration = function (id, name) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť inšpiráciu" ' + name + '"?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeInspiration(id);
                _this.ds.showNotification('success', 'Inšpirácia <b>' + name + '</b> bola úspešne odstránená!');
                $('tr#' + id).hide();
            }
        });
    };
    InspirationListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inspiration-list-cmp',
            templateUrl: 'inspirationlist.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], InspirationListComponent);
    return InspirationListComponent;
}());
exports.InspirationListComponent = InspirationListComponent;
//# sourceMappingURL=inspirationlist.component.js.map