import { Routes } from '@angular/router';

import { Login } from './login/login'
import { Home } from './home/home';
import { Collection } from './collection/collection';
import { SellCar } from './sell-car/sell-car';
import { AboutUs } from './about-us/about-us';
import { ContactUs } from './contact-us/contact-us';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'Home', component: Home },
    { path: 'Login', component: Login },
    { path: 'Collection', component: Collection },
    { path: 'Sell-Car', component: SellCar },
    { path: 'About-Us', component: AboutUs },
    { path: 'Contact-Us', component: ContactUs },
];