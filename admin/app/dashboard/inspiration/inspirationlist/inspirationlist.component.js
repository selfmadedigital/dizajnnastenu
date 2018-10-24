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
        var ds = this.ds;
        var rtr = this.router;
        var Upload = function (file, target) {
            this.file = file;
            this.target = target;
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
            formData.append("id", "");
            formData.append("target", this.target);
            $.ajax({
                type: "POST",
                url: "/admin/api/inspiration_service.php",
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
                $('#inspirations-table tbody').append('<tr><td>' + resdata.responseJSON + '</td></tr>');
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
        $("#inspiration-multiupload").on("change", function (e) {
            var files = $(this)[0].files;
            $.each(files, function () {
                var upload = new Upload(this, "inspirations-multiupload");
                upload.doUpload();
            });
            ds.showNotification("success", "Dokončený import pre " + files.length + " inšpirácií");
        });
        $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
        $('.tagsinput').tagsinput({
            tagClass: ' tag-rose '
        });
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    };
    InspirationListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getInspirations().subscribe(function (res) {
            _this.inspirations = res;
        });
    };
    InspirationListComponent.prototype.updateFilters = function () {
        var ds = this.ds;
        $('#inspirations-table tbody tr').each(function () {
            if ($(this).find('input.selector').is(':checked')) {
                var data = {};
                var inspname = $(this).find('.inspiration-name').text();
                data['id'] = $(this).attr('id');
                data['filters-' + $('#filtercategory').val()] = $('#filters-selection').val();
                data['target'] = 'filters';
                ds.updateInspiration(data);
                ds.showNotification('success', 'Aktualizované filtre pre inšpiráciu <b>' + inspname + '</b>!');
            }
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