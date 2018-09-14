import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from "../data.service";
import initDataTable = require('/admin/assets/js/init/initDataTable.js');

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'users-list-cmp',
    templateUrl: 'userslist.component.html',
    providers: [DataService]
})

export class UsersListComponent implements OnInit, AfterViewInit{
    users: any[] = [];
    roles: any[] = [];
    
    constructor(private ds: DataService) {}

    ngOnInit(){
        // Init Tooltips
        $('[rel="tooltip"]').tooltip();
    }
    
    ngAfterViewInit(): void {
        this.ds.getUsers().subscribe(res => { 
            this.users = res;
        });
        
        this.ds.getRoles().subscribe(res => { 
            this.roles = res;
        });
    }
    
    removeUser(id: string, username: string) {
        swal({
          title: 'Naozaj odstrániť užívateľa ' + username + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Áno odstrániť!',
          cancelButtonText: 'Zrušiť'
          }).then((result) => {
            if (result.value) {
                this.ds.removeFilter(id);
                this.ds.showNotification("success","Užívateľ <b>" + username + "</b> bol úspešne odstránený!");
                $('tr#'+id).hide();
            }
        })
    }
    
    public isCurrentUser(id){
        return true;
    }
}