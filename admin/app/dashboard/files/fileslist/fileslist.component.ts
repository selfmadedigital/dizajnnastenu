import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'fileslist-list-cmp',
    templateUrl: 'fileslist.component.html',
    providers: [DataService]
})

export class FilesListComponent implements OnInit, AfterViewInit{
    category: string;
    files: any[] = [];
    
    constructor(private ds: DataService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        $('[rel="tooltip"]').tooltip();
        
        this.category = this.route.snapshot.params['category'];
        var cat = this.category;
        this.ds.getFiles(this.category).subscribe(res => { 
            // $.each(res['images'],function(index, value){
            //     $('#table-files').append('<tr id="'+index+'"><td><div class="checkbox"><label><input type="checkbox" class="selector"></label></div></td><td class="img-container"><img src="/img/'+cat+'/'+value+'" alt="'+value+'"></td><td class="image-name">'+value+'</td><td class="td-actions text-right"><button type="button" rel="tooltip" class="btn btn-danger" (click)="removeFile(\''+index+'\', \''+value+'\')"><i class="material-icons">close</i></button></td></tr>');
            // });
            this.files = res;
        });
    }
    
    removeFiles() {
        var ds = this.ds;
        var cat = this.category;
        
        $('#table-files tbody tr').each(function(){
            if($(this).find('input.selector').is(':checked')){
                var imgname = $(this).find('.image-name').text();
                ds.removeFile(cat,imgname);
                ds.showNotification("success","Obrázok <b>" + imgname + "</b> bol úspešne odstránený!");
                $(this).hide();    
            }
        });
    }
    
    removeFile(id: string, name: string, category: string) {
        swal({
          title: 'Naozaj odstrániť obrázok ' + name + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result) {
                this.ds.removeFile(category,name);
                this.ds.showNotification("success","Obrázok <b>" + name + "</b> bol úspešne odstránený!");
                $('tr#'+id).hide();
            }
        })
    }
}