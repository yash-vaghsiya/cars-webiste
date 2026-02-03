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
import { BookAppointment } from './book-appointment/book-appointment';
import { CarDetails } from './car-details/car-details';


export const routes: Routes = [
    { path: '', component: Login },
    { path: 'Login', component: Login },
    { path: 'Home', component: Home, canActivate: [AuthGuard] },
    { path: 'collection', component: Collection, canActivate: [AuthGuard] },
    { path: 'car-details/:id', component: CarDetails, canActivate: [AuthGuard] },
    { path: 'sell-car', component: SellCar, canActivate: [AuthGuard] },
    { path: 'about-us', component: AboutUs, canActivate: [AuthGuard] },
    { path: 'contact-us', component: ContactUs, canActivate: [AuthGuard] },
    { path: 'book-appointment', component: BookAppointment, canActivate: [AuthGuard] },
    { path: '**', component: Page404}  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
