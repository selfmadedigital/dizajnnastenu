import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'blog-list-cmp',
    templateUrl: 'bloglist.component.html',
    providers: [DataService]
})

export class BlogListComponent implements OnInit, AfterViewInit{
    blogs: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    ngAfterViewInit(): void {
        this.ds.getBlogs().subscribe(res => { 
            this.blogs = res;
        });
    }
    
    removeBlog(id: string, name: string) {
        swal({
          title: 'Naozaj odstrániť článok "' + name + '"?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result) {
                this.ds.removeBlog(id);
                this.ds.showNotification("success","Článok <b>" + name + "</b> bol úspešne odstránený!");
                $('tr#'+id).hide();
            }
        })
    }
}
