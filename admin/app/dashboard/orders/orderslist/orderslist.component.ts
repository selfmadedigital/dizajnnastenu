import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";
import initDataTable = require('/admin/assets/js/init/initDataTable.js');

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'orders-list-cmp',
    templateUrl: 'orderslist.component.html',
    providers: [DataService]
})

export class OrdersListComponent implements OnInit, AfterViewInit{
    orders: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    ngAfterViewInit(): void {
        this.ds.getOrders().subscribe(res => { 
            this.orders = res;
        });
        
        this.ds.getStates().subscribe(res => { 
            this.orderstates = res;
        });
    }
    
    removeOrder(id: string) {
        swal({
          title: 'Naozaj odstrániť objednávku číslo ' + id + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result.value) {
                this.ds.removeFilter(id);
                this.ds.showNotification("success","Objednávka číslo <b>" + id + "</b> bola úspešne odstránená!");
                $('tr#'+id).hide();
            }
        })
    }
    
    changeOrderState(orderid: string, stateid: string) {
        var dataorder = {};
        
        dataorder['target'] = 'state';
        dataorder['orderid'] = orderid;
        dataorder['stateid'] = stateid;
        
        $.ajax({
            type: "POST",
        	url: "/admin/api/order_service.php",
        	data: dataorder,
        	success: function(data){
        	    $('#orders-table tr#' + dataorder['orderid'] + ' .dropdown button span').text(data['state']);
        	}
        });
    }
}