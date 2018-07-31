import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'shippings-list-cmp',
    templateUrl: 'shippingslist.component.html',
    providers: [DataService]
})

export class ShippingsListComponent implements OnInit, AfterViewInit{
    shippings: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    ngAfterViewInit(): void {
        this.ds.getShippings().subscribe(res => { 
            this.shippings = res;
        });
    }
    
    removeShipping(id: string, name: string) {
        swal({
          title: 'Naozaj odstrániť prepravu ' + name + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result.value) {
                this.ds.removeShipping(id);
                this.ds.showNotification("success","Preprava <b>" + name + "</b> bola úspešne odstránená!");
                $('tr#'+id).hide();
            }
        })
    }
}