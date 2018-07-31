import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router } from "@angular/router";


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'blog-new-cmp',
    templateUrl: 'blognew.component.html'
    providers: [DataService]
})

export class BlogNewComponent implements OnInit{
    
    inspirations: any[] = [];
    
    constructor(private ds: DataService, private router: Router) {}
    
    ngOnInit(){
        var Upload = function (file, target) {
            this.file = file;
            this.target = target;
        };
        
        Upload.prototype.getType = function() {
            return this.file.type;
        };
        Upload.prototype.getSize = function() {
            return this.file.size;
        };
        Upload.prototype.getName = function() {
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
        
        $("#blog-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "blog");
            upload.doUpload();
        });
        
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
    }
    
    ngAfterViewInit(): void {
        this.ds.getInspirations().subscribe(res => { 
            this.inspirations = res;
            console.log(this.inspirations);
        });
        
        if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
        
        $('textarea').froalaEditor({
            language: 'sk'
        });
    }
    
    onSubmit() {
        var data = {};
        
        data['name'] = $('#blog_name').val();
        data['img'] = 'blog/default.jpg';
        
        if($('#blog-image').val().length > 0){
            data['img'] = 'blog/'+ $('#blog-image').val().split('\\').pop();
        }
        
        $('.tagsinput').each(function(i) {
    		data[$(this).attr('id')] = $(this).val();
    	});
    	
        data['short_content'] = $('textarea#short_content').froalaEditor('html.get');
        data['long_content'] = $('textarea#long_content').froalaEditor('html.get');

        this.ds.updateBlog(data);
        this.router.navigate(['/blog/list']);
    }
    
    validateForm() {
        console.log();
    }
}
