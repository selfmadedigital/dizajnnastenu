import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getFiles(category: string) : Observable<any> {
    return this.http.get("/admin/api/files_service.php?category=" + category).map((res:Response) => { return res.json(); })
  }
  
  removeFile(category, name){
    $.ajax({
      url: "/admin/api/files_service.php?category=" + category + "&name=" + name,
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