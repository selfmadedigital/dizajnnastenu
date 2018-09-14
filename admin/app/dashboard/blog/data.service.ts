import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getBlogs() : Observable<any> {
    return this.http.get("/admin/api/blog_service.php").map((res:Response) => { return res.json(); })
  }
  
  getBlog(id){
    return this.http.get("/admin/api/blog_service.php?id=" + id).map((res:Response) => { return res.json(); })
  }
  
  getInspirations() : Observable<any> {
    return this.http.get("/admin/api/inspiration_service.php").map((res:Response) => { return res.json(); })
  }
  
  updateBlog(data){
      $.ajax({
          type: "POST",
		      url: "/admin/api/blog_service.php",
		      data: data,
		      async: false,
		      success: function(data){
		        console.log(data);
          }
      });
  }
  
  removeBlog(id){
    $.ajax({
      url: "/admin/api/blog_service.php?id=" + id,
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