import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'filterslist-list-cmp',
    templateUrl: 'filterslist.component.html',
    providers: [DataService]
})

export class FiltersListComponent implements OnInit, AfterViewInit{
    filters: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    imageUploaded(e){
        var ds = this.ds;
        
        var Upload = function (file, target, id) {
            this.file = file;
            this.target = target;
            this.id = id;
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
            formData.append("id", this.id);
            formData.append("target", this.target);
        
            $.ajax({
                type: "POST",
                url: "/admin/api/filter_service.php",
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
                $('tr#' + resdata.responseJSON['id'] + ' .img-container').html('<img src="/img/' + resdata.responseJSON['img'] + '" alt="' + resdata.responseJSON['id'] + '" />');
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
        
        var file = e.target.files[0];
        var id = $(e.target.parentElement.parentElement.parentElement).attr('id');
        
        var upload = new Upload(file, "filters", id);
        upload.doUpload();
    }
    
    ngAfterViewInit(): void {
        this.ds.getFilters().subscribe(res => { 
            this.filters = res;
        });
    }
    
    removeFilter(id: string, name: string) {
        swal({
          title: 'Naozaj odstrániť filter ' + name + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result) {
                this.ds.removeFilter(id);
                this.ds.showNotification("success","Filter <b>" + name + "</b> bol úspešne odstránený!");
                $('tr#'+id).hide();
            }
        })
    }
}