import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'blog-edit-cmp',
    templateUrl: 'blogedit.component.html'
    providers: [DataService]
})

export class BlogEditComponent implements OnInit{
    inspirations: any[] = [];
    
    constructor(private ds: DataService, private router: Router, private route: ActivatedRoute) {}
    
    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        
        $('textarea').froalaEditor({
            language: 'sk'
        });
        
        var id = this.route.snapshot.params['id'];
        var ds = this.ds;
        
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
            var resdata = {};
        
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
            
            if(resdata.responseJSON['result'] == '0'){
                $.each(resdata.responseJSON['errors'], function(){
                   ds.showNotification("danger",this); 
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
        
        this.ds.getBlog(this.route.snapshot.params['id']).subscribe(res => { 
            $('#blog_name').val(res['name']);
            $('#blog_name').parent().removeClass('is-empty');
            $('#blog-image-upload').html('<img src="/img/' + res['img'] + '" alt="' + res['name'] + '">');
            
            $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
            $('.tagsinput').tagsinput({
                tagClass: ' tag-rose '
            });
            
            $.each(res['filters'], function(key, value) {
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
    }
    
    ngAfterViewInit(): void {
        this.ds.getInspirations().subscribe(res => { 
            this.inspirations = res;
        });
        
        if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
    }
    
    onSubmit() {
        var data = {};
        
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#blog_name').val();
        
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
