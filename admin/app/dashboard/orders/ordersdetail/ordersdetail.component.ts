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
    productprices: any[] = [];
    materialprices: any[] = [];
    installationprices: any[] = [];
    
    constructor(private ds: DataService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
        
        this.ds.getOrder(this.route.snapshot.params['id']).subscribe(res => { 
            // var product = res['product_name'].toLowerCase().replace(/\b[a-z]/g, function(letter) {
            //     return letter.toUpperCase();
            // });
            
            var installation = 'Nie';
            if(res['installation'] == "1"){
                installation = 'Áno';
            }
            
            $('#order-id').text(res['id']);
            $('#product-name').text(product);
            $('#product-material').text(res['material_name']);
            $('#product-installation').text(installation);
            $('#product-finalisation').text(res['finalisation_id']);
            $('#product-size').text(res['width'] + 'm x ' + res['height'] + 'm');
            $('#product-quantity').text(res['quantity'] + 'ks');
            
            $('#customer-name').text(res['customer_name']);
            $('#customer-surname').text(res['customer_surname']);
            
            $('#customer-address').text(res['customer_address']);
            $('#customer-postcode').text(res['customer_postcode']);
            $('#customer-city').text(res['customer_city']);
            
            if(res['customer_shipping_address'].length == 0 && res['customer_shipping_postcode'] == "0" && res['customer_shipping_city'].length == 0){
                $('#headingTwo').hide();
            }else{
                $('#customer-delivery-address').text(res['customer_shipping_address']);
                $('#customer-delivery-postcode').text(res['customer_shipping_postcode']);
                $('#customer-delivery-city').text(res['customer_shipping_city']);
            }
            
            $('#customer-telephone').text(res['customer_telephone']);
            $('#customer-email').text(res['customer_email']);
            
            $('#shipping-name').text(res['shipping_name']);
            $('#shipping-price').text(res['shipping_price'] + '€');
            
            $('#price-shipping').text(res['shipping_price'] + '€');
            $('#price-total').text(res['total_price'] + '€');
            
            var squareSize = res['width'] * res['height'];
            var pricePerSquare = 0;
            var pricePerSquareCalculated = this.ds.calculatePrice("prices", res['product_name'], '', squareSize);
            if(pricePerSquareCalculated != null){
                pricePerSquare = parseFloat(pricePerSquareCalculated).toFixed(2);   
            }
        	
        	var priceMaterial = 0;
        	var priceMaterialCalculated = this.ds.calculatePrice("material-prices", res['product_name'], res['material_id'], squareSize);
        	if(priceMaterialCalculated != null){
        	    priceMaterial = parseFloat(priceMaterialCalculated).toFixed(2);
        	}
        	
        	var priceInstallation = 0;
        	if(res['installation'] == "1"){
        	    var priceInstallationCalculated = this.ds.calculatePrice("installations", res['product_name'], '', squareSize);
        	    if(priceInstallationCalculated != null){
        	        priceInstallation = parseFloat(priceInstallationCalculated).toFixed(2);
        	    }
        	}
        // 	var priceFinalisation = squaresize*parseFloat($('#product-finalisation').text());
            var priceFinalisation = 0;
        
            $('#price-base').text(pricePerSquare  + '€');
            $('#price-material').text(priceMaterial  + '€');
            $('#price-installation').text(priceInstallation  + '€');
            $('#price-finalisation').text(priceFinalisation  + '€');
            $('#price-shipping').text(res['shipping_price']  + '€');
        
            var totalPrice = ((parseFloat(pricePerSquare) + parseFloat(priceMaterial) + parseFloat(priceInstallation) + parseFloat(priceFinalisation))*squareSize).toFixed(2);
        	$('#price-piece').text(totalPrice  + '€');
        
        	var quantity = parseInt(res['quantity']);
        	var discount = this.ds.getQuantityDiscount(quantity, res['product_name']);
        
        	totalPrice = (totalPrice * quantity).toFixed(2);
        	if(discount > 0){
        		totalPrice = (totalPrice*(100-parseFloat(discount))/100).toFixed(2);
        	}
        	
        	$('#price-discount').text(discount + '%');
        
        	totalPrice = (parseFloat(totalPrice) + parseFloat(res['shipping_price'])).toFixed(2);
        	$('#price-total').text(totalPrice + '€ (' + (totalPrice/1.2).toFixed(2) + '€ bez DPH)');
        });
    }
    
    ngAfterViewInit(): void {
        
        this.ds.getStates().subscribe(res => { 
            this.orderstates = res;
        });
    }
}