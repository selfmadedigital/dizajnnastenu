import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getOrders() : Observable<any> {
    return this.http.get("/admin/api/order_service.php").map((res:Response) => { return res.json(); })
  }
  
  getOrder(id){
    return this.http.get("/admin/api/order_service.php?id=" + id).map((res:Response) => { return res.json(); })
  }
  
  getStates() : Observable<any> {
    return this.http.get("/admin/api/order_service.php?target=states").map((res:Response) => { return res.json(); })
  }
  
  getProductPrices(product_name: string) : any {
    return this.http.get("/admin/api/product_service.php?target=prices&name=" + product_name.toString()).map((res:Response) => { return res.json(); });
  }
  
  getQuantityDiscount(quantity, name){
      var data = {};
    	data['target'] = 'discounts';
    	data['name'] = name;
    	data['format'] = 'calculate';
    	
    	var result = 0;
    	
    	$.ajax({
        type: "GET",
        url: "/admin/api/product_service.php",
        data: data,
        async: false,
        success: function(data){
          $.each(data, function(key, value) {
        		key = parseInt(key);
        		value = parseFloat(value);
            if(quantity >= key && result < value){
            	result = value;
            }
        	});
        }
    	});
    	
    	return result;
  }
  
  calculatePrice(target, name, id, squaresize) {
      var data = {};
    	data['target'] = target;
    	data['name'] = name;
    	data['id'] = id;
    	data['format'] = 'calculate';
    	
    	var result = 0;
    
      $.ajax({
        type: "GET",
        url: "/admin/api/product_service.php",
        data: data,
        async: false,
        success: function(data){
          if(Object.keys(data).length > 0){
            if(data[squaresize] !== undefined){
          		result = data[squaresize];
          	}else{
          		var max = 0;
          		var min = Infinity;
          		$.each(data, function(key, value) {
          			key = parseFloat(key);
          			if(key > max){
          				max = key;
          			}
          
          			if(key < min){
          				min = key;
          			}
          		});
          		if(squaresize > max){
          			result = data[max];
          		}else if(squaresize < min){
          			result = data[min];
          		}else{
          			var lower = 0;
          			var greater = Infinity;
          			$.each(data, function(key, value) {
          				key = parseFloat(key);
          				if(key > squaresize){
          					if(key < greater){
          						greater = key;
          					}
          				}
          
          				if(key < squaresize){
          					if(key > lower){
          						lower = key;
          					}
          				}
          			});
          
          			var diff = parseFloat(data[lower.toFixed(2)]) - parseFloat(data[greater.toFixed(2)]);
          			var div = diff/(greater-lower);
          			result = parseFloat(data[lower.toFixed(2)]) - div*(squaresize - lower);
          		}
          	}
          }
        }else{
          result = 0;
        }
      });
      
      return result;
    }
  
  removeOrder(id){
    $.ajax({
      url: "/admin/api/order_service.php?id=" + id,
      type: 'DELETE',
      success: function(data) {
          console.log(data);
      }
    });
  }
  
  showNotification(type, message){
        $.notify({
            message: message
        },{
            type: type,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }
}