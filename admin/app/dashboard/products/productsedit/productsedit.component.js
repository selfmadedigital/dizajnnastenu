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
var ProductsEditComponent = (function () {
    function ProductsEditComponent(ds, route, router) {
        this.ds = ds;
        this.route = route;
        this.router = router;
        this.materials = [];
        this.prices = [];
    }
    ProductsEditComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        var product_name = this.route.snapshot.params['name'];
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
            formData.append("product_name", product_name);
            formData.append("target", this.target);
            $.ajax({
                type: "POST",
                url: "/admin/api/product_service.php",
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
        $('textarea').froalaEditor({
            language: 'sk'
        });
        this.ds.getProduct(this.route.snapshot.params['name']).subscribe(function (res) {
            $('#product_name').val(res['name']);
            $('#product_name').parent().removeClass('is-empty');
            $('#product-image-upload').html('<img src="/img/' + res['img'] + '" alt="' + res['name'] + '">');
            $('#colorpicker input').val('#' + res['color']);
            $("#colorpicker").colorpicker({
                format: 'hex',
                color: res['color'],
            });
            $('textarea#short_information').froalaEditor('html.set', res['short_information']);
            $('textarea#long_information').froalaEditor('html.set', res['long_information']);
            $('textarea#description').froalaEditor('html.set', res['description']);
        });
        $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
        $("#product-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "products");
            upload.doUpload();
        });
    };
    ProductsEditComponent.prototype.selectMaterial = function (id, name) {
        $('#materials-table tbody tr').css('background', '#fff');
        $('#material-price-table tbody tr').remove();
        $('#material-' + id).css('background', 'rgba(0, 188, 212, 0.40)');
        $('#material-' + id).addClass('selected');
        var materialdata = {
            "id": id,
            "target": "material-prices",
            "name": this.route.snapshot.params['name']
        };
        materialdata = $(this).serialize() + "&" + $.param(materialdata);
        $.ajax({
            type: "GET",
            url: "/admin/api/product_service.php",
            data: materialdata,
            dataType: "json",
            success: function (data) {
                if (data != 0) {
                    $.each(data, function (key, value) {
                        $('#material-price-table tbody').append('<tr id="material-price-' + value['id'] + '"><td>' + parseFloat(value['size']).toFixed(2) + ' <small>m<sup>2</sup></small></td><td>' + parseFloat(value['price']).toFixed(2) + ' <small>&euro;</small></td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" (click)="removematerialprice(' + value['id'] + ',' + value['size'] + ')"><i class="material-icons">close</i></button></td></tr>');
                    });
                }
            }
        });
        $('#material-price-card').show();
    };
    ProductsEditComponent.prototype.imageUploaded = function (e) {
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
            // add assoc key values, this will be posts values
            formData.append("file", this.file, this.getName());
            formData.append("upload_file", true);
            formData.append("id", this.id);
            formData.append("target", this.target);
            $.ajax({
                type: "POST",
                url: "/admin/api/product_service.php",
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', that.progressHandling, false);
                    }
                    return myXhr;
                },
                complete: function (data) {
                    $('tr#' + data.responseJSON['id'] + ' .img-container').html('<img src="/img/' + data.responseJSON['img'] + '" alt="' + data.responseJSON['id'] + '" />');
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
        var file = e.target.files[0];
        var id = $(e.target.parentElement.parentElement.parentElement).attr('id');
        var upload = new Upload(file, "materials", id);
        upload.doUpload();
    };
    ProductsEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getProductMaterials(this.route.snapshot.params['name']).subscribe(function (res) {
            _this.materials = res;
        });
        this.ds.getProductPrices(this.route.snapshot.params['name']).subscribe(function (res) {
            _this.prices = res;
        });
        this.ds.getProductDiscounts(this.route.snapshot.params['name']).subscribe(function (res) {
            _this.discounts = res;
        });
        this.ds.getProductInstallations(this.route.snapshot.params['name']).subscribe(function (res) {
            _this.installations = res;
        });
    };
    ProductsEditComponent.prototype.createTablePriceEntry = function (target) {
        var dataprice = {};
        if ($('#new-' + target + '-size').val().length > 0 && $('#new-' + target + '-price').val().length > 0) {
            dataprice['target'] = target;
            dataprice['size'] = $('#new-' + target + '-size').val();
            dataprice['price'] = $('#new-' + target + '-price').val();
            if (target == 'material-price') {
                dataprice['id'] = $('#materials-table tbody tr.selected').attr('id').split("-")[1];
            }
            else {
                dataprice['id'] = this.route.snapshot.params['name'];
            }
            $.ajax({
                type: "POST",
                url: "/admin/api/product_service.php",
                data: dataprice,
                success: function (data) {
                    var min = 0;
                    var minIndex = -1;
                    $('#' + target + '-table > tbody > tr').each(function (i) {
                        var value = parseInt($($(this).children()[0]).text());
                        if (value > min && value < dataprice['size']) {
                            min = value;
                            minIndex = i;
                        }
                    });
                    if (minIndex == -1) {
                        $('#' + target + '-table > tbody > tr').eq(0).before('<tr id="' + target + '-' + data + '"><td>' + parseFloat(dataprice['size']).toFixed(2) + ' <small>m<sup>2</sup></small></td><td>' + parseFloat(dataprice['price']).toFixed(2) + ' <small>&euro;</small></td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" onClick="remove' + target.replace("-", "") + '(' + data + ',' + dataprice['size'] + ')"><i class="material-icons">close</i></button></td></tr>');
                    }
                    else {
                        $('#' + target + '-table > tbody > tr').eq(minIndex).after('<tr id="' + target + '-' + data + '"><td>' + parseFloat(dataprice['size']).toFixed(2) + ' <small>m<sup>2</sup></small></td><td>' + parseFloat(dataprice['price']).toFixed(2) + ' <small>&euro;</small></td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" onClick="remove' + target.replace("-", "") + '(' + data + ',' + dataprice['size'] + ')"><i class="material-icons">close</i></button></td></tr>');
                    }
                }
            });
            $('#new-' + target + '-size').val('');
            $('#new-' + target + '-price').val('');
        }
    };
    ProductsEditComponent.prototype.createInstallation = function () {
        var dataprice = {};
        if ($('#new-installation-price').val().length > 0 && $('#new-installation-size').val().length > 0) {
            dataprice['target'] = 'installation';
            dataprice['size'] = $('#new-installation-size').val();
            dataprice['price'] = $('#new-installation-price').val();
            dataprice['product_name'] = this.route.snapshot.params['name'];
            $.ajax({
                type: "POST",
                url: "/admin/api/product_service.php",
                data: dataprice,
                success: function (data) {
                    var min = 0;
                    var minIndex = -1;
                    $('#installations-table > tbody > tr').each(function (i) {
                        var value = parseInt($($(this).children()[0]).text());
                        if (value > min && value < dataprice['size']) {
                            min = value;
                            minIndex = i;
                        }
                    });
                    if (minIndex == -1) {
                        $('#installations-table > tbody > tr').eq(0).before('<tr id="installation-' + data + '"><td>' + parseFloat(dataprice['size']).toFixed(2) + ' <small>m<sup>2</sup></small></td><td>' + parseFloat(dataprice['price']).toFixed(2) + ' <small>&euro;</small></td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" (click)="removeInstallation(' + data + ')"><i class="material-icons">close</i></button></td></tr>');
                    }
                    else {
                        $('#installations-table > tbody > tr').eq(minIndex).after('<tr id="installation-' + data + '"><td>' + parseFloat(dataprice['size']).toFixed(2) + ' <small>m<sup>2</sup></small></td><td>' + parseFloat(dataprice['price']).toFixed(2) + ' <small>&euro;</small></td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" (click)="removeInstallation(' + data + ')"><i class="material-icons">close</i></button></td></tr>');
                    }
                }
            });
            $('#new-installation-size').val('');
            $('#new-installation-price').val('');
        }
    };
    ProductsEditComponent.prototype.createMaterial = function () {
        var materialdata = {};
        if ($('#new-material').val().length > 0) {
            materialdata['target'] = 'material';
            materialdata['name'] = $('#new-material').val();
            materialdata['product_name'] = this.route.snapshot.params['name'];
            $.ajax({
                type: "POST",
                url: "/admin/api/product_service.php",
                data: materialdata,
                success: function (data) {
                    $('#materials-table tbody').append('<tr id="material-' + data + '"><td class="img-container"><img alt="' + materialdata['name'] + '" src="/img/materials/default.jpg"></td><td>' + materialdata['name'] + '</td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-success"><i class="material-icons">add_a_photo</i></button><button type="button" rel="tooltip" class="btn btn-info" (click)="selectMaterial(' + data + ')"><i class="material-icons">keyboard_arrow_down</i></button><button type="button" rel="tooltip" class="btn btn-danger" (click)="removeMaterial(' + data + ')"><i class="material-icons">close</i></button></td></tr>');
                }
            });
            $('#new-material').val('');
        }
    };
    ProductsEditComponent.prototype.createDiscount = function () {
        var discountdata = {};
        if ($('#new-discount_quantity').val().length > 0 && $('#new-discount_percentage').val().length > 0) {
            discountdata['target'] = 'discount';
            discountdata['quantity'] = $('#new-discount_quantity').val();
            discountdata['percentage'] = $('#new-discount_percentage').val();
            discountdata['product_name'] = this.route.snapshot.params['name'];
            $.ajax({
                type: "POST",
                url: "/admin/api/product_service.php",
                data: discountdata,
                success: function (data) {
                    $('#discounts-table tbody').append('<tr id="discount-' + data + '"><td>' + discountdata['quantity'] + ' <small>ks</small></td><td>' + discountdata['percentage'] + ' <small>%</small></td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" (click)="removeDiscount(' + data + ', ' + discountdata['quantity'] + ')"><i class="material-icons">close</i></button></td></tr>');
                }
            });
            $('#new-discount_quantity').val('');
            $('#new-discount_percentage').val('');
        }
    };
    ProductsEditComponent.prototype.onSubmitForm = function () {
        var formdata = {};
        formdata['short_information'] = $('textarea#short_information').froalaEditor('html.get');
        formdata['long_information'] = $('textarea#long_information').froalaEditor('html.get');
        formdata['description'] = $('textarea#description').froalaEditor('html.get');
        formdata['color'] = $('#color').val().substring(1);
        formdata['product_name'] = this.route.snapshot.params['name'];
        $.ajax({
            url: "/admin/api/product_service.php",
            type: 'POST',
            data: formdata,
            complete: function (data) {
                console.log(data);
            }
        });
        this.ds.showNotification("success", "Produkt <b>" + formdata['product_name'] + "</b> bol úspešne upravený!");
        this.router.navigate(['/products/list']);
    };
    ProductsEditComponent.prototype.removeMaterial = function (id, name) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť materiál "' + name + '" ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeTarget(id, 'material');
                _this.ds.showNotification('success', 'Materiál <b>' + name + '</b> bol úspešne odstránený!');
                $('tr#material-' + id).hide();
            }
        });
    };
    ProductsEditComponent.prototype.removeprice = function (id, size) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť cenovú hranicu pre ' + size + 'm<sup>2</sup> ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeTarget(id, 'price');
                _this.ds.showNotification('success', 'Cenová hranica pre <b>' + size + ' m<sup>2</sup></b>bola úspešne odstránená!');
                $('tr#price-' + id).hide();
            }
        });
    };
    ProductsEditComponent.prototype.removematerialprice = function (id, size) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť cenovú hranicu pre ' + size + 'm<sup>2</sup> ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeTarget(id, 'price');
                _this.ds.showNotification('success', 'Cenová hranica pre <b>' + size + ' m<sup>2</sup></b>bola úspešne odstránená!');
                $('tr#price-' + id).hide();
            }
        });
    };
    ProductsEditComponent.prototype.removeDiscount = function (id, size) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť hranicu zľavy pre ' + size + 'ks ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeTarget(id, 'discount');
                _this.ds.showNotification('success', 'Hranica zľavy pre <b>' + size + 'ks bola úspešne odstránená!');
                $('tr#discount-' + id).hide();
            }
        });
    };
    ProductsEditComponent.prototype.removeInstallation = function (id, size) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť hranicu ceny inštalácie pre ' + size + 'm<sup>2</sup> ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeTarget(id, 'installation');
                _this.ds.showNotification('success', 'Hranica ceny inštalácie pre <b>' + size + ' m<sup>2</sup></b> bola úspešne odstránená!');
                $('tr#installation-' + id).hide();
            }
        });
    };
    ProductsEditComponent.prototype.removeFinalisation = function (id, size) {
        var _this = this;
        swal({
            title: 'Naozaj odstrániť hranicu ceny inštalácie pre ' + size + 'm<sup>2</sup> ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Áno odstrániť!',
            cancelButtonText: 'Zrušiť'
        }).then(function (result) {
            if (result) {
                _this.ds.removeTarget(id, 'finalisation');
                _this.ds.showNotification('success', 'Hranica ceny inštalácie pre <b>' + size + ' m<sup>2</sup></b> bola úspešne odstránená!');
                $('tr#finalisation-' + id).hide();
            }
        });
    };
    ProductsEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'products-edit-cmp',
            templateUrl: 'productsedit.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute, router_1.Router])
    ], ProductsEditComponent);
    return ProductsEditComponent;
}());
exports.ProductsEditComponent = ProductsEditComponent;
//# sourceMappingURL=productsedit.component.js.map