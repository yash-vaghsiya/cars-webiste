// import { RouterModule, Routes } from '@angular/router';
// import { Login } from './login/login'
// import { Home } from './home/home';
// import { Collection } from './collection/collection';
// import { SellCar } from './sell-car/sell-car';
// import { AboutUs } from './about-us/about-us';
// import { ContactUs } from './contact-us/contact-us';
// import { AuthGuard } from './auth-guard';
// import { Page404 } from './page-404/page-404';
// import { NgModule } from '@angular/core';
// export const routes: Routes = [
//     { path: '', component: Login },
    // { path: 'Home', component:Home, canActivate: [AuthGuard] },
//     { path: 'Login', component: Login , canActivate: [AuthGuard]},
//     { path: 'Collection', component: Collection, canActivate: [AuthGuard] },
//     { path: 'Sell-Car', component: SellCar, canActivate: [AuthGuard] },
//     { path: 'About-Us', component: AboutUs, canActivate: [AuthGuard] },
//     { path: 'Contact-Us', component: ContactUs, canActivate: [AuthGuard] },
//     { path: '**', component: Page404 }  // Wildcard route for a 404 page
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login'
import { Home } from './home/home';
import { Collection } from './collection/collection';
import { SellCar } from './sell-car/sell-car';
import { AboutUs } from './about-us/about-us';
import { ContactUs } from './contact-us/contact-us';
import { AuthGuard } from './auth-guard';
import { Page404 } from './page-404/page-404';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'Login', component: Login },
    { path: 'Home', component: Home, canActivate: [AuthGuard] },
    { path: 'Collection', component: Collection, canActivate: [AuthGuard] },
    { path: 'Sell-Car', component: SellCar, canActivate: [AuthGuard] },
    { path: 'About-Us', component: AboutUs, canActivate: [AuthGuard] },
    { path: 'Contact-Us', component: ContactUs, canActivate: [AuthGuard] },
    { path: '**', component: Page404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}