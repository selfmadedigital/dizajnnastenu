"use strict";
// import { DashboardComponent } from './dashboard.component';
var home_component_1 = require('./home/home.component');
var productslist_component_1 = require('./products/productslist/productslist.component');
var productsedit_component_1 = require('./products/productsedit/productsedit.component');
var bloglist_component_1 = require('./blog/bloglist/bloglist.component');
var blogedit_component_1 = require('./blog/blogedit/blogedit.component');
var blognew_component_1 = require('./blog/blognew/blognew.component');
var inspirationlist_component_1 = require('./inspiration/inspirationlist/inspirationlist.component');
var inspirationedit_component_1 = require('./inspiration/inspirationedit/inspirationedit.component');
var inspirationnew_component_1 = require('./inspiration/inspirationnew/inspirationnew.component');
var filterslist_component_1 = require('./filters/filterslist/filterslist.component');
var orderslist_component_1 = require('./orders/orderslist/orderslist.component');
var ordersdetail_component_1 = require('./orders/ordersdetail/ordersdetail.component');
var shippingslist_component_1 = require('./shippings/shippingslist/shippingslist.component');
var shippingsedit_component_1 = require('./shippings/shippingsedit/shippingsedit.component');
var shippingsnew_component_1 = require('./shippings/shippingsnew/shippingsnew.component');
var userslist_component_1 = require('./users/userslist/userslist.component');
var passwordchange_component_1 = require('./users/passwordchange/passwordchange.component');
var fileslist_component_1 = require('./files/fileslist/fileslist.component');
//
exports.MODULE_ROUTES = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: home_component_1.HomeComponent },
    { path: 'products/list', component: productslist_component_1.ProductsListComponent },
    { path: 'products/edit/:name', component: productsedit_component_1.ProductsEditComponent },
    { path: 'blog/list', component: bloglist_component_1.BlogListComponent },
    { path: 'blog/edit/:id', component: blogedit_component_1.BlogEditComponent },
    { path: 'blog/new', component: blognew_component_1.BlogNewComponent },
    { path: 'inspiration/list', component: inspirationlist_component_1.InspirationListComponent },
    { path: 'inspiration/edit/:id', component: inspirationedit_component_1.InspirationEditComponent },
    { path: 'inspiration/new', component: inspirationnew_component_1.InspirationNewComponent },
    { path: 'filters/list', component: filterslist_component_1.FiltersListComponent },
    { path: 'orders/list', component: orderslist_component_1.OrdersListComponent },
    { path: 'orders/detail/:id', component: ordersdetail_component_1.OrdersDetailComponent },
    { path: 'shippings/list', component: shippingslist_component_1.ShippingsListComponent },
    { path: 'shippings/edit/:id', component: shippingsedit_component_1.ShippingsEditComponent },
    { path: 'shippings/new', component: shippingsnew_component_1.ShippingsNewComponent },
    { path: 'users/list', component: userslist_component_1.UsersListComponent },
    { path: 'users/passwordchange', component: passwordchange_component_1.PasswordChangeComponent },
    { path: 'files/list/:category', component: fileslist_component_1.FilesListComponent },
];
//
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    productslist_component_1.ProductsListComponent,
    productsedit_component_1.ProductsEditComponent,
    bloglist_component_1.BlogListComponent,
    blogedit_component_1.BlogEditComponent,
    blognew_component_1.BlogNewComponent,
    inspirationlist_component_1.InspirationListComponent,
    inspirationedit_component_1.InspirationEditComponent,
    inspirationnew_component_1.InspirationNewComponent,
    filterslist_component_1.FiltersListComponent,
    orderslist_component_1.OrdersListComponent,
    ordersdetail_component_1.OrdersDetailComponent,
    shippingslist_component_1.ShippingsListComponent,
    shippingsedit_component_1.ShippingsEditComponent,
    shippingsnew_component_1.ShippingsNewComponent,
    userslist_component_1.UsersListComponent,
    passwordchange_component_1.PasswordChangeComponent,
    fileslist_component_1.FilesListComponent,
];
//# sourceMappingURL=dashboard.routes.js.map