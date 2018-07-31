import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";

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
    }
    
    ngAfterViewInit(): void {
        this.ds.getInspirations().subscribe(res => { 
            this.inspirations = res;
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
