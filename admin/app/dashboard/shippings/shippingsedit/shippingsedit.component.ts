import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'shippings-edit-cmp',
    templateUrl: 'shippingsedit.component.html',
    providers: [DataService]
})

export class ShippingsEditComponent implements OnInit{
    
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
        
        this.ds.getShipping(this.route.snapshot.params['id']).subscribe(res => { 
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
    }
    
    onSubmit() {
        var data = {};
        
        data['id'] = this.route.snapshot.params['id'];
        data['name'] = $('#shipping_name').val();
        data['price'] = $('#shipping_price').val();
        
        this.ds.updateShipping(data);
        this.ds.showNotification("success","Preprava <b>" + data['name'] + "</b> bola úspešne upravená!");
        this.router.navigate(['/shippings/list']);
    }
    
    validateForm() {
        console.log();
    }
}
