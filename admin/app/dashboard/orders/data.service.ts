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