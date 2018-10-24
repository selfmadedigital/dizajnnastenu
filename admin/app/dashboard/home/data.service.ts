import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from "@angular/http";
import '/admin/node_modules/rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http : Http){
  }
  
  getReports(category: string) : Observable<any> {
    return this.http.get("/admin/api/reports_service.php?category="+category).map((res:Response) => { return res.json(); })
  }

  getProductReports() : Observable<any> {
    return this.getReports('product');
  }
  
  getBlogReports() : Observable<any> {
    return this.getReports('blog');
  }
  
  getInspirationReports() : Observable<any> {
    return this.getReports('inspiration');
  }
  
  getFilterReports() : Observable<any> {
    return this.getReports('filter_attribute');
  }
  
  getShippingReports() : Observable<any> {
    return this.getReports('shipping');
  }
  
  getStats() : any {
    return this.http.get("/admin/api/stats_service.php").map((res:Response) => { return res.json(); })
  }
}