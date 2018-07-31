import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }

  getProducts() : Observable<any> {
    return this.http.get("/admin/api/product_service.php").map((res:Response) => { return res.json(); });
  }
  
  getProduct(product_name: string) : any {
    return this.http.get("/admin/api/product_service.php?name=" + product_name.toString()).map((res:Response) => { return res.json(); });
  }
  
  getProductMaterials(product_name: string) : any {
    return this.http.get("/admin/api/product_service.php?target=materials&name=" + product_name.toString()).map((res:Response) => { return res.json(); });
  }
  
  getProductPrices(product_name: string) : any {
    return this.http.get("/admin/api/product_service.php?target=prices&name=" + product_name.toString()).map((res:Response) => { return res.json(); });
  }
  
  getProductDiscounts(product_name: string) : any {
    return this.http.get("/admin/api/product_service.php?target=discounts&name=" + product_name.toString()).map((res:Response) => { return res.json(); });
  }
  
  getProductInstallations(product_name: string) : any {
    return this.http.get("/admin/api/product_service.php?target=installations&name=" + product_name.toString()).map((res:Response) => { return res.json(); });
  }
  
  removeTarget(id, target){
    $.ajax({
      url: "/admin/api/product_service.php?target=" + target + "&id=" + id,
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