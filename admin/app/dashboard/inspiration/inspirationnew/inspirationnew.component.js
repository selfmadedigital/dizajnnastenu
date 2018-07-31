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
var router_1 = require("@angular/router");
var InspirationNewComponent = (function () {
    function InspirationNewComponent(ds, router) {
        this.ds = ds;
        this.router = router;
    }
    InspirationNewComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
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
                    console.log(data);
                },
                error: function (error) {
                    // handle error
                },
                async: true,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                timeout: 60000
            });
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
        $("#inspiration-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "inspirations");
            upload.doUpload();
        });
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
        var filters = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 100,
            remote: {
                url: '/admin/api/filter_service.php?mode=list',
                filter: function (list) {
                    return $.map(list, function (name) {
                        return { name: name };
                    });
                }
            }
        });
        filters.initialize();
        var countries = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: {
                url: '/admin/api/inspiration_service.php',
                filter: function (list) {
                    return $.map(list, function (name) {
                        return { name: name };
                    });
                }
            }
        });
        countries.initialize();
        $('.tagsinput').tagsinput({
            typeaheadjs: {
                name: 'f',
                displayKey: 'name',
                valueKey: 'name',
                source: filters.ttAdapter()
            }
        });
    };
    InspirationNewComponent.prototype.onSubmit = function () {
        var data = {};
        data['name'] = $('#inspiration_name').val();
        data['img'] = 'inspirations/default.jpg';
        if ($('#inspiration-image').val().length > 0) {
            data['img'] = 'inspirations/' + $('#inspiration-image').val().split('\\').pop();
        }
        $('.tagsinput').each(function (i) {
            data[$(this).attr('id')] = $(this).val();
        });
        this.ds.updateInspiration(data);
        this.ds.showNotification("success", "Inšpirácia <b>" + data['name'] + "</b> bola úspešne vytvorená!");
        this.router.navigate(['/inspiration/list']);
    };
    InspirationNewComponent.prototype.validateForm = function () {
        console.log();
    };
    InspirationNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inspiration-new-cmp',
            templateUrl: 'inspirationnew.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router])
    ], InspirationNewComponent);
    return InspirationNewComponent;
}());
exports.InspirationNewComponent = InspirationNewComponent;
//# sourceMappingURL=inspirationnew.component.js.map