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
var ShippingsEditComponent = (function () {
    function ShippingsEditComponent(ds, router, route) {
        this.ds = ds;
        this.router = router;
        this.route = route;
    }
    ShippingsEditComponent.prototype.ngOnInit = function () {
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
                url: "/admin/api/shipping_service.php",
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
        this.ds.getShipping(this.route.snapshot.params['id']).subscribe(function (res) {
            $('#shipping_name').val(res['name']);
            $('#shipping_name').parent().removeClass('is-empty');
            $('#shipping_price').val(res['price']);
            $('#shipping_price').parent().removeClass('is-empty');
            $('#shipping-image-upload').html('<img src="/img/' + res['img'] + '" alt="' + res['name'] + '">');
        });
        $("#shipping-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "shipping");
            upload.doUpload();
        });
    };
    ShippingsEditComponent.prototype.onSubmit = function () {
        var data = {};
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#shipping_name').val();
        data['price'] = $('#shipping_price').val();
        this.ds.updateShipping(data);
        this.ds.showNotification("success", "Preprava <b>" + data['name'] + "</b> bola úspešne upravená!");
        this.router.navigate(['/shippings/list']);
    };
    ShippingsEditComponent.prototype.validateForm = function () {
        console.log();
    };
    ShippingsEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'shippings-edit-cmp',
            templateUrl: 'shippingsedit.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
    ], ShippingsEditComponent);
    return ShippingsEditComponent;
}());
exports.ShippingsEditComponent = ShippingsEditComponent;
//# sourceMappingURL=shippingsedit.component.js.map