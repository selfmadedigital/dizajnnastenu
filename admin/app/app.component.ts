import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

declare var $:any;
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit{
    location: Location;
    constructor(location:Location) {
        this.location = location;
    }
    ngOnInit(){
        $.getScript('/admin/assets/js/init/initMenu.js');
        $.getScript('/admin/assets/js/plugins/froala_editor.min.js');
        $.getScript('/admin/assets/js/plugins/froala_editor.pkgd.min.js');
        $.getScript('/admin/assets/js/plugins/jquery.tinycolorpicker.min.js');
	    $.getScript('/admin/assets/js/plugins/bootstrap-colorpicker.min.js');
        $.getScript('/admin/assets/js/demo.js');
    }
    public isMap(){
        // console.log(this.location);
        if(this.location.prepareExternalUrl(this.location.path()) == '#/maps/fullscreen'){
            return true;
        }
        else {
            return false;
        }
    }
}
