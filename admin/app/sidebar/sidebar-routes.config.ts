import { MenuType, RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Nástenka', menuType: MenuType.LEFT, icon: 'material-icons' },
   
    { path: 'products/list', title: 'Produkty', menuType: MenuType.LEFT, icon:'material-icons' },
    { path: 'products/edit', title: 'Produkty', menuType: MenuType.LEFT, icon:'material-icons' },
   
    { path: 'blog/list', title: 'Blog', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'blog/edit', title: 'Blog', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'blog/new', title: 'Blog', menuType: MenuType.LEFT, icon: 'material-icons' },
   
    { path: 'inspiration/list', title: 'Inšpirácia', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'inspiration/edit', title: 'Inšpirácia', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'inspiration/new', title: 'Inšpirácia', menuType: MenuType.LEFT, icon: 'material-icons' },
    
    { path: 'filters/list', title: 'Filtre', menuType: MenuType.LEFT, icon: 'material-icons' },
    
    { path: 'orders/list', title: 'Objedávky', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'orders/detail', title: 'Objedávky', menuType: MenuType.LEFT, icon: 'material-icons' },
    
    { path: 'shippings/list', title: 'Preprava', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'shippings/edit', title: 'Preprava', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'shippings/new', title: 'Preprava', menuType: MenuType.LEFT, icon: 'material-icons' },
    
    { path: 'user/passwordchange', title: 'Používateľ', menuType: MenuType.LEFT, icon: 'material-icons' },
    
    { path: 'users/list', title: 'Užívatelia', menuType: MenuType.LEFT, icon: 'material-icons' },
    { path: 'files/list', title: 'Súbory', menuType: MenuType.LEFT, icon: 'material-icons' },
    
    { path: 'quotes/list', title: 'Citáty', menuType: MenuType.LEFT, icon: 'material-icons' },
];
