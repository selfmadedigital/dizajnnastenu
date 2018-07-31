import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'orders-detail-cmp',
    templateUrl: 'ordersdetail.component.html',
    providers: [DataService]
})

export class OrdersDetailComponent implements OnInit, AfterViewInit{
    orders: any[] = [];
    
    constructor(private ds: DataService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        
        this.ds.getOrder(this.route.snapshot.params['id']).subscribe(res => { 
            this.order = res;
        });
    }
    
    ngAfterViewInit(): void {
        
        this.ds.getStates().subscribe(res => { 
            this.orderstates = res;
        });
    }
}