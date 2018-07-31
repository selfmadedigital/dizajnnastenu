import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getShippings() : Observable<any> {
    return this.http.get("/admin/api/shipping_service.php").map((res:Response) => { return res.json(); })
  }
  
  getShipping(id){
    return this.http.get("/admin/api/shipping_service.php?id=" + id).map((res:Response) => { return res.json(); })
  }
  
  updateShipping(data){
    $.ajax({
        type: "POST",
		url: "/admin/api/shipping_service.php",
		data: data,
		success: function(data){
		    console.log(data);
        }
    });
  }
  
  removeShipping(id){
    $.ajax({
      url: "/admin/api/shipping_service.php?id=" + id,
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