import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'vendor/:slug', component: VendorComponent },
    { path: 'checkout', component: CheckoutComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });