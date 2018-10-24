import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";
import {BrowserModule} from '@angular/platform-browser'


declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'inspiration-list-cmp',
    templateUrl: 'inspirationlist.component.html',
    providers: [DataService]
})

export class InspirationListComponent implements OnInit, AfterViewInit{
    inspirations: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        
        var ds = this.ds;
        var rtr = this.router;
        
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
            }else{
                $('#inspirations-table tbody').append('<tr><td>' + resdata.responseJSON + '</td></tr>');
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
        
        $("#inspiration-multiupload").on("change", function (e) {
            var files = $(this)[0].files;
            $.each(files, function(){
                var upload = new Upload(this, "inspirations-multiupload");
                upload.doUpload(); 
            });
            
            ds.showNotification("success","Dokončený import pre " + files.length + " inšpirácií"); 
        });
        
        $.getScript('/admin/assets/js/plugins/jquery.tagsinput.js');
            $('.tagsinput').tagsinput({
                tagClass: ' tag-rose '
            });
            
            if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }
    }
    
    ngAfterViewInit(): void {
        this.ds.getInspirations().subscribe(res => { 
            this.inspirations = res;
        });
    }
    
    updateFilters() {
        var ds = this.ds;
        
        $('#inspirations-table tbody tr').each(function(){
            if($(this).find('input.selector').is(':checked')){
                var data = {};
                var inspname = $(this).find('.inspiration-name').text();
                
                data['id'] = $(this).attr('id');
            	data['filters-' + $('#filtercategory').val()] = $('#filters-selection').val();
                data['target'] = 'filters';
                
                ds.updateInspiration(data);
                ds.showNotification('success','Aktualizované filtre pre inšpiráciu <b>' + inspname + '</b>!');
            }
        });
    }

    removeInspiration(id: string, name: string) {
        swal({
          title: 'Naozaj odstrániť inšpiráciu" ' + name + '"?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result) {
                this.ds.removeInspiration(id);
                this.ds.showNotification('success','Inšpirácia <b>' + name + '</b> bola úspešne odstránená!');
                $('tr#'+id).hide();
            }
        })
    }
}
