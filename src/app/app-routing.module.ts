import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BestSellersComponent } from './pages/home/best-sellers/best-sellers.component';
import { NewArrivalsComponent } from './pages/home/new-arrivals/new-arrivals.component';
import { SpecialOffersComponent } from './pages/home/special-offers/special-offers.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { InfoAboutBookComponent } from './pages/product/info-about-book/info-about-book.component';
import { DetailsBookComponent } from './pages/product/details-book/details-book.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { MyAccountComponent } from './pages/login/my-account/my-account.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/newArrivals', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'newArrivals', pathMatch: 'full' },
      { path: 'bestSellers', component: BestSellersComponent },
      { path: 'newArrivals', component: NewArrivalsComponent },
      { path: 'specialOffers', component: SpecialOffersComponent }
    ]
  },
  { path: 'category/:cat', component: CategoryComponent },
  { path: 'category/:cat/:subcat', component: CategoryComponent },
  {
    // path: 'product/:id', component: ProductComponent, children: [
    path: 'category/:cat/:subcat?/:product', component: ProductComponent, children: [
      { path: '', redirectTo: 'infoBook', pathMatch: 'full' },
      { path: 'infoBook', component: InfoAboutBookComponent },
      { path: 'detailsBook', component: DetailsBookComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'subcategory', component: AdminSubCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'discount', component: AdminDiscountsComponent },
      { path: 'orders', component: AdminOrdersComponent },
    ]
  },
  { path: 'search/:searchText', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/sign-up', component: SignUpComponent},
  { path: 'login/forgot-password', component: ForgotPasswordComponent},
  { path: 'login/my-account', component: MyAccountComponent},
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '/home/newArrivals' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
