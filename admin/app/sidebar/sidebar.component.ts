import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';
import { Http } from "@angular/http";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    
    constructor(private http : Http){
    }
  
    ngOnInit() {
        $.getScript('../admin/assets/js/sidebar-moving-tab.js');

        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }
    
    ngAfterViewInit(): void {
        this.http.get("/admin/api/auth_service.php?target=active").map((res:Response) => { return res.json(); }).subscribe(res => { 
            this.currentUser = res;
        });
    }
}
