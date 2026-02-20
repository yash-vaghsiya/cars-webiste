import { Login } from './login/login'
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Collection } from './collection/collection';
import { SellCar } from './sell-car/sell-car';
import { AboutUs } from './about-us/about-us';
import { ContactUs } from './contact-us/contact-us';
import { NgModule } from '@angular/core';
import { BookAppointment } from './book-appointment/book-appointment';
import { CarDetails } from './car-details/car-details';
import { Page404 } from './page-404/page-404';
import { AdminPanel } from './admin-panel/admin-panel';
import { userbooking } from './admin-book-appointment/admin-book-appointment';
import { AdminCarInventory } from './admin-car-inventory/admin-car-inventory';
import { AdminAddVehicle } from './admin-add-vehicle/admin-add-vehicle';
import { AdminSellCarsection } from './admin-sell-carsection/admin-sell-carsection';
import { AdminSendMessage } from './admin-send-message/admin-send-message';
import { AuthGuard } from './auth-guard';
import { CARCHATASSISTANT } from './car-chat-assistant/car-chat-assistant';
import { Footer } from './footer/footer';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'Login', component: Login },
    { path: 'Home', component: Home,canActivate: [AuthGuard] },
    { path: 'collection', component: Collection, canActivate: [AuthGuard] },
    { path: 'car-details/:id', component: CarDetails, canActivate: [AuthGuard] },
    { path: 'sell-car', component: SellCar, canActivate: [AuthGuard] },
    { path: 'about-us', component: AboutUs, canActivate: [AuthGuard] },
    { path: 'contact-us', component: ContactUs, canActivate: [AuthGuard] },
    { path: 'book-appointment', component: BookAppointment, canActivate: [AuthGuard] },
    { path: 'admin-panel', component: AdminPanel, canActivate: [AuthGuard] },
    { path: 'admin-book-appointment', component: userbooking, canActivate: [AuthGuard] },
    { path:'admin-car-inventory', component: AdminCarInventory, canActivate: [AuthGuard]},
    { path:'admin-add-vehicle', component: AdminAddVehicle, canActivate: [AuthGuard]},
    { path:'admin-sell-carsection', component: AdminSellCarsection, canActivate: [AuthGuard]},
    { path:'admin-send-message', component: AdminSendMessage, canActivate: [AuthGuard]},
    { path:'CARCHATASSISTANT', component: CARCHATASSISTANT, canActivate: [AuthGuard]},
    { path:'Footer', component: Footer, canActivate: [AuthGuard]},
    { path: '**', component: Page404} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}



// import { Login } from './login/login'
// import { RouterModule, Routes } from '@angular/router';
// import { Home } from './home/home';6
// import { Collection } from './collection/collection';
// import { SellCar } from './sell-car/sell-car';
// import { AboutUs } from './about-us/about-us';
// import { ContactUs } from './contact-us/contact-us';
// import { NgModule } from '@angular/core';
// import { BookAppointment } from './book-appointment/book-appointment';
// import { CarDetails } from './car-details/car-details';
// import { Page404 } from './page-404/page-404';
// import { AdminPanel } from './admin-panel/admin-panel';
// import { userbooking } from './admin-book-appointment/admin-book-appointment';
// import { AdminCarInventory } from './admin-car-inventory/admin-car-inventory';
// import { AdminAddVehicle } from './admin-add-vehicle/admin-add-vehicle';
// import { AdminSellCarsection } from './admin-sell-carsection/admin-sell-carsection';
// import { AdminSendMessage } from './admin-send-message/admin-send-message';
// import { AuthGuard } from './auth-guard';
// import { Footer } from './footer/footer';

// export const routes: Routes = [
//     { path: '', component: Login },
//     { path: 'Login', component: Login },
//     { path: 'Home', component: Home, },
//     { path: 'collection', component: Collection,  },
//     { path: 'car-details/:id', component: CarDetails,  },
//     { path: 'sell-car', component: SellCar,  },
//     { path: 'about-us', component: AboutUs,  },
//     { path: 'contact-us', component: ContactUs,  },
//     { path: 'book-appointment', component: BookAppointment,  },
//     { path: 'admin-panel', component: AdminPanel,  },
//     { path: 'admin-book-appointment', component: userbooking,  },
//     { path:'admin-car-inventory', component: AdminCarInventory, },
//     { path:'admin-add-vehicle', component: AdminAddVehicle, },
//     { path:'admin-sell-carsection', component: AdminSellCarsection, },
//     { path:'admin-send-message', component: AdminSendMessage, },
//     { path:'Footer', component: Footer, },
//     { path: '**', component: Page404} 
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}