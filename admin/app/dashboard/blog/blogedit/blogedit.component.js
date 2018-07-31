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
var BlogEditComponent = (function () {
    function BlogEditComponent(ds, router, route) {
        this.ds = ds;
        this.router = router;
        this.route = route;
        this.inspirations = [];
    }
    BlogEditComponent.prototype.ngOnInit = function () {
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        $('textarea').froalaEditor({
            language: 'sk'
        });
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
                url: "/admin/api/blog_service.php",
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
        this.ds.getBlog(this.route.snapshot.params['id']).subscribe(function (res) {
            $('#blog_name').val(res['name']);
            $('#blog_name').parent().removeClass('is-empty');
            $('#blog-image-upload').html('<img src="/img/' + res['img'] + '" alt="' + res['name'] + '">');
            $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
            $('.tagsinput').tagsinput({
                tagClass: ' tag-rose '
            });
            $.each(res['filters'], function (key, value) {
                $('#filters-' + value['attribute']).tagsinput('add', value['name']);
            });
            $('textarea#short_content').froalaEditor('html.set', res['short_content']);
            $('textarea#long_content').froalaEditor('html.set', res['long_content']);
        });
        $("#blog-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "blog");
            upload.doUpload();
        });
    };
    BlogEditComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.ds.getInspirations().subscribe(function (res) {
            _this.inspirations = res;
        });
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    };
    BlogEditComponent.prototype.onSubmit = function () {
        var data = {};
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#blog_name').val();
        $('.tagsinput').each(function (i) {
            data[$(this).attr('id')] = $(this).val();
        });
        data['short_content'] = $('textarea#short_content').froalaEditor('html.get');
        data['long_content'] = $('textarea#long_content').froalaEditor('html.get');
        this.ds.updateBlog(data);
        this.router.navigate(['/blog/list']);
    };
    BlogEditComponent.prototype.validateForm = function () {
        console.log();
    };
    BlogEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'blog-edit-cmp',
            templateUrl: 'blogedit.component.html',
            providers: [data_service_1.DataService]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
    ], BlogEditComponent);
    return BlogEditComponent;
}());
exports.BlogEditComponent = BlogEditComponent;
//# sourceMappingURL=blogedit.component.js.map