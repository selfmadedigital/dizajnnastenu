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
var InspirationEditComponent = (function () {
    function InspirationEditComponent(ds, router, route) {
        this.ds = ds;
        this.router = router;
        this.route = route;
    }
    InspirationEditComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        var id = this.route.snapshot.params['id'];
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
            formData.append("id", id);
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
        this.ds.getInspiration(this.route.snapshot.params['id']).subscribe(function (res) {
            $('#inspiration_name').val(res['name']);
            $('#inspiration_name').parent().removeClass('is-empty');
            $('#inspiration-image-upload').html('<img src="/img/' + res['img'] + '" alt="' + res['name'] + '">');
            $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
            $('.tagsinput').tagsinput({
                tagClass: ' tag-rose '
            });
            $.each(res['filters'], function (key, value) {
                $('#filters-' + value['attribute']).tagsinput('add', value['name']);
            });
        });
        $("#inspiration-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "inspirations");
            // maby check size or type here with upload.getSize() and upload.getType()
            // execute upload
            upload.doUpload();
        });
    };
    InspirationEditComponent.prototype.onSubmit = function () {
        var data = {};
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#inspiration_name').val();
        $('.tagsinput').each(function (i) {
            data[$(this).attr('id')] = $(this).val();
        });
        this.ds.updateInspiration(data);
        this.ds.showNotification("success", "Inšpirácia <b>" + data['name'] + "</b> bola úspešne upravená!");
        this.router.navigate(['/inspiration/list']);
    };
    InspirationEditComponent.prototype.validateForm = function () {
        console.log();
    };
    InspirationEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inspiration-edit-cmp',
            templateUrl: 'inspirationedit.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
    ], InspirationEditComponent);
    return InspirationEditComponent;
}());
exports.InspirationEditComponent = InspirationEditComponent;
//# sourceMappingURL=inspirationedit.component.js.map