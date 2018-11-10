import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'quoteslist-list-cmp',
    templateUrl: 'quoteslist.component.html',
    providers: [DataService]
})

export class QuotesListComponent implements OnInit, AfterViewInit{
    filters: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    ngAfterViewInit(): void {
        this.ds.getQuotes().subscribe(res => { 
            this.quotes = res;
        });
    }
    
    removeQuote(id: string) {
        swal({
          title: 'Naozaj odstrániť citát ' + id + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result) {
                this.ds.removeFilter(id);
                this.ds.showNotification("success","Citát <b>" + id + "</b> bol úspešne odstránený!");
                $('tr#'+id).hide();
            }
        })
    }
}