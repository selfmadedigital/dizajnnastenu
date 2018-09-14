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
    
    changeRole(userid: string, roleid: string){
        if(!isAdmin()){
            this.ds.showNotification('danger', 'Nemáte opávnenie na zmenu užívateľa!')
        }else{
            var data = {};
        
        data['userid'] = userid;
        data['roleid'] = roleid;
        data['target'] = 'role';
        
            $.ajax({
                type: "POST",
        		url: "/admin/api/auth_service.php",
        		data: data,
        		async: false,
        		success: function(data){
        		    
        		}
            });
        }
    }
    
    removeUser(id: string, username: string) {
        if(!isAdmin()){
            this.ds.showNotification('danger', 'Nemáte opávnenie na odstránenie užívateľa!')
        }else{
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
                    this.ds.removeUser(id);
                    this.ds.showNotification("success","Užívateľ <b>" + username + "</b> bol úspešne odstránený!");
                    $('tr#'+id).hide();
                }
            })
        }
    }
    
    createUser() {
        if(!isAdmin()){
            this.ds.showNotification('danger', 'Nemáte opávnenie na odstránenie užívateľa!')
        }else{
            //
        }
    }
    
    isAdmin(id){
            $.ajax({
                type: "GET",
        		url: "/admin/api/auth_service.php?target=isadmin&id=" + $('#userid').val(),
        		data: data,
        		async: false,
        		success: function(data){
        		    if(data == '1'){
        		        return true;
        		    }else{
        		        return false;
        		    }
        		}
            });
    }
    
    public isCurrentUser(id){
            if(id == $('#userid').val()){
                return true;
            }else{
                return false;
            }
    }
}