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
var ShippingsNewComponent = (function () {
    function ShippingsNewComponent(ds, router, route) {
        this.ds = ds;
        this.router = router;
        this.route = route;
    }
    ShippingsNewComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        var id = this.route.snapshot.params['id'];
        var ds = this.ds;
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
            formData.append("id", id);
            formData.append("target", this.target);
            $.ajax({
                type: "POST",
                url: "/admin/api/shipping_service.php",
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
        $("#shipping-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "shipping");
            upload.doUpload();
        });
    };
    ShippingsNewComponent.prototype.onSubmit = function () {
        var data = {};
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#shipping_name').val();
        data['price'] = $('#shipping_price').val();
        data['img'] = 'shipping/default.jpg';
        if ($('#shipping-image').val().length > 0) {
            data['img'] = 'shipping/' + $('#shipping-image').val().split('\\').pop();
        }
        this.ds.updateShipping(data);
        this.ds.showNotification("success", "Preprava <b>" + data['name'] + "</b> bola úspešne vytvorená!");
        this.router.navigate(['/shippings/list']);
    };
    ShippingsNewComponent.prototype.validateForm = function () {
        console.log();
    };
    ShippingsNewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'shippings-new-cmp',
            templateUrl: 'shippingsnew.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
    ], ShippingsNewComponent);
    return ShippingsNewComponent;
}());
exports.ShippingsNewComponent = ShippingsNewComponent;
//# sourceMappingURL=shippingsnew.component.js.map