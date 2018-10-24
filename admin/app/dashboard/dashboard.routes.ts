import { Route, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

import { ProductsListComponent } from './products/productslist/productslist.component';
import { ProductsEditComponent } from './products/productsedit/productsedit.component';

import { BlogListComponent } from './blog/bloglist/bloglist.component';
import { BlogEditComponent } from './blog/blogedit/blogedit.component';
import { BlogNewComponent } from './blog/blognew/blognew.component';

import { InspirationListComponent } from './inspiration/inspirationlist/inspirationlist.component';
import { InspirationEditComponent } from './inspiration/inspirationedit/inspirationedit.component';
import { InspirationNewComponent } from './inspiration/inspirationnew/inspirationnew.component';

import { FiltersListComponent } from './filters/filterslist/filterslist.component';

import { OrdersListComponent } from './orders/orderslist/orderslist.component';
import { OrdersDetailComponent } from './orders/ordersdetail/ordersdetail.component';

import { ShippingsListComponent } from './shippings/shippingslist/shippingslist.component';
import { ShippingsEditComponent } from './shippings/shippingsedit/shippingsedit.component';
import { ShippingsNewComponent } from './shippings/shippingsnew/shippingsnew.component';

import { UsersListComponent } from './users/userslist/userslist.component';
import { PasswordChangeComponent } from './users/passwordchange/passwordchange.component';

import { FilesListComponent } from './files/fileslist/fileslist.component';
//
export const MODULE_ROUTES: Route[] =[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent },

    { path: 'products/list', component: ProductsListComponent },
    { path: 'products/edit/:name', component: ProductsEditComponent },
    
    { path: 'blog/list', component: BlogListComponent },
    { path: 'blog/edit/:id', component: BlogEditComponent },
    { path: 'blog/new', component: BlogNewComponent },
    
    { path: 'inspiration/list', component: InspirationListComponent },
    { path: 'inspiration/edit/:id', component: InspirationEditComponent },
    { path: 'inspiration/new', component: InspirationNewComponent },
    
    { path: 'filters/list', component: FiltersListComponent },
    
    { path: 'orders/list', component: OrdersListComponent },
    { path: 'orders/detail/:id', component: OrdersDetailComponent },
    
    { path: 'shippings/list', component: ShippingsListComponent },
    { path: 'shippings/edit/:id', component: ShippingsEditComponent },
    { path: 'shippings/new', component: ShippingsNewComponent },

    { path: 'users/list', component: UsersListComponent },
    { path: 'users/passwordchange', component: PasswordChangeComponent },
    
    { path: 'files/list/:category', component: FilesListComponent },
]
//
export const MODULE_COMPONENTS = [
    HomeComponent,

    ProductsListComponent,
    ProductsEditComponent,
    
    BlogListComponent,
    BlogEditComponent,
    BlogNewComponent,
    
    InspirationListComponent,
    InspirationEditComponent,
    InspirationNewComponent,
    
    FiltersListComponent,
    
    OrdersListComponent,
    OrdersDetailComponent,
    
    ShippingsListComponent,
    ShippingsEditComponent,
    ShippingsNewComponent,
    
    UsersListComponent,
    PasswordChangeComponent,
    
    FilesListComponent,
]
