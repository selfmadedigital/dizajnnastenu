import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'inspiration-edit-cmp',
    templateUrl: 'inspirationedit.component.html',
    providers: [DataService]
})

export class InspirationEditComponent implements OnInit{
    
    constructor(private ds: DataService, private router: Router, private route: ActivatedRoute) {}
    
    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        
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
        
        this.ds.getInspiration(this.route.snapshot.params['id']).subscribe(res => { 
            $('#inspiration_name').val(res['name']);
            $('#inspiration_name').parent().removeClass('is-empty');
            $('#inspiration-image-upload').html('<img src="/img/' + res['img'] + '" alt="' + res['name'] + '">');
            
            $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
            $('.tagsinput').tagsinput({
                tagClass: ' tag-rose '
            });
            
            $.each(res['filters'], function(key, value) {
    			$('#filters-' + value['attribute']).tagsinput('add', value['name']);
    		});
        });
        
        $("#inspiration-image").on("change", function (e) {
            var file = $(this)[0].files[0];
            var upload = new Upload(file, "inspirations");
            upload.doUpload();
        });
    }
    
    onSubmit() {
        var data = {};
        
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#inspiration_name').val();
        
        $('.tagsinput').each(function(i) {
    		data[$(this).attr('id')] = $(this).val();
    	});
        
        this.ds.updateInspiration(data);
        this.ds.showNotification("success","Inšpirácia <b>" + data['name'] + "</b> bola úspešne upravená!");
        this.router.navigate(['/inspiration/list']);
    }
    
    validateForm() {
        console.log();
    }
}
