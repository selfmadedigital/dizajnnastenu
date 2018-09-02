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
var FiltersListComponent = (function () {
    function FiltersListComponent(ds) {
        this.ds = ds;
        this.filters = [];
    }
    FiltersListComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    };
    FiltersListComponent.prototype.imageUploaded = function (e) {
        var ds = this.ds;
        var Upload = function (file, target, id) {
            this.file = file;
            this.target = target;
            this.id = id;
        };
        Upload.prototype.getType = function () {
            return this.file.type;
        };
        Upload.prototype.getSize = function () {
            return this.file.size;
        };
        Upload.prototype.getName = function () {
            return this.file.name;
        };
        Upload.prototype.doUpload = function () {
            var that = this;
            var formData = new FormData();
            var resdata = {};
            // add assoc key values, this will be posts values
            formData.append("file", this.file, this.getName());
            formData.append("upload_file", true);
            formData.append("id", this.id);
            formData.append("target", this.target);
            $.ajax({
                type: "POST",
                url: "/admin/api/filter_service.php",
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', that.progressHandling, false);
                    }
                    return myXhr;
                },
                complete: function (data) {
                    resdata = data;
                },
                error: function (error) {
                    // handle error
                },
                async: false,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                timeout: 60000
            });
            if (resdata.responseJSON['result'] == '0') {
                $.each(resdata.responseJSON['errors'], function () {
                    ds.showNotification("danger", this);
                });
            }
            else {
                $('tr#' + resdata.responseJSON['id'] + ' .img-container').html('<img src="/img/' + resdata.responseJSON['img'] + '" alt="' + resdata.responseJSON['id'] + '" />');
            }
        };
        Upload.prototype.progressHandling = function (event) {
            var percent = 0;
            var position = event.loaded || event.position;
            var total = event.total;
            var progress_bar_id = "#progress-wrp";
            if (event.lengthComputable) {
                percent = Math.ceil(position / total * 100);
            }
            // update progressbars classes so it fits your code
            $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
            $(progress_bar_id + " .status").text(percent + "%");
        };
        var file = e.target.files[0];
        var id = $(e.target.parentElement.parentElement.parentElement).attr('id');
        var upload = new Upload(file, "filters", id);
        upload.doUpload();
    };
    FiltersListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getFilters().subscribe(function (res) {
            _this.filters = res;
        });
    };
    FiltersListComponent.prototype.removeFilter = function (id, name) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť filter ' + name + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeFilter(id);
                _this.ds.showNotification("success", "Filter <b>" + name + "</b> bol úspešne odstránený!");
                $('tr#' + id).hide();
            }
        });
    };
    FiltersListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'filterslist-list-cmp',
            templateUrl: 'filterslist.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], FiltersListComponent);
    return FiltersListComponent;
}());
exports.FiltersListComponent = FiltersListComponent;
//# sourceMappingURL=filterslist.component.js.map