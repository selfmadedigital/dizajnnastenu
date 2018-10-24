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
var FilesListComponent = (function () {
    function FilesListComponent(ds, route, router) {
        this.ds = ds;
        this.route = route;
        this.router = router;
        this.files = [];
    }
    FilesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('[rel="tooltip"]').tooltip();
        this.category = this.route.snapshot.params['category'];
        var cat = this.category;
        this.ds.getFiles(this.category).subscribe(function (res) {
            // $.each(res['images'],function(index, value){
            //     $('#table-files').append('<tr id="'+index+'"><td><div class="checkbox"><label><input type="checkbox" class="selector"></label></div></td><td class="img-container"><img src="/img/'+cat+'/'+value+'" alt="'+value+'"></td><td class="image-name">'+value+'</td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" (click)="removeFile(\''+index+'\', \''+value+'\')"><i class="material-icons">close</i></button></td></tr>');
            // });
            _this.files = res;
        });
    };
    FilesListComponent.prototype.removeFiles = function () {
        var ds = this.ds;
        var cat = this.category;
        $('#table-files tbody tr').each(function () {
            if ($(this).find('input.selector').is(':checked')) {
                var imgname = $(this).find('.image-name').text();
                ds.removeFile(cat, imgname);
                ds.showNotification("success", "Obrázok <b>" + imgname + "</b> bol úspešne odstránený!");
                $(this).hide();
            }
        });
    };
    FilesListComponent.prototype.removeFile = function (id, name, category) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť obrázok ' + name + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeFile(category, name);
                _this.ds.showNotification("success", "Obrázok <b>" + name + "</b> bol úspešne odstránený!");
                $('tr#' + id).hide();
            }
        });
    };
    FilesListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fileslist-list-cmp',
            templateUrl: 'fileslist.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute, router_1.Router])
    ], FilesListComponent);
    return FilesListComponent;
}());
exports.FilesListComponent = FilesListComponent;
//# sourceMappingURL=fileslist.component.js.map