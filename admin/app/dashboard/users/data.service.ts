import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getUsers() : Observable<any> {
    return this.http.get("/admin/api/auth_service.php").map((res:Response) => { return res.json(); })
  }
  
  getRoles() : Observable<any> {
    return this.http.get("/admin/api/auth_service.php?target=roles").map((res:Response) => { return res.json(); })
  }
  
  removeUser(id){
    $.ajax({
      url: "/admin/api/auth_service.php?id=" + id,
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