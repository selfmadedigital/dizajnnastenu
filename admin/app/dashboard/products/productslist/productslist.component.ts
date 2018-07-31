import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'products-list-cmp',
    templateUrl: 'productslist.component.html',
    providers: [DataService]
})

export class ProductsListComponent implements OnInit, AfterViewInit{
    products: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    ngAfterViewInit(): void {
        this.ds.getProducts().subscribe(res => { 
            this.products = res;
        });
    }
}