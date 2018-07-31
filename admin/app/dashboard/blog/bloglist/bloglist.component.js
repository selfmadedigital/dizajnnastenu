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
var BlogListComponent = (function () {
    function BlogListComponent(ds) {
        this.ds = ds;
        this.blogs = [];
    }
    BlogListComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    };
    BlogListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getBlogs().subscribe(function (res) {
            _this.blogs = res;
        });
    };
    BlogListComponent.prototype.removeBlog = function (id, name) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť článok "' + name + '"?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeBlog(id);
                _this.ds.showNotification("success", "Článok <b>" + name + "</b> bol úspešne odstránený!");
                $('tr#' + id).hide();
            }
        });
    };
    BlogListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'blog-list-cmp',
            templateUrl: 'bloglist.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;
//# sourceMappingURL=bloglist.component.js.map