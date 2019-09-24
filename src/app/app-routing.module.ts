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

const routes: Routes = [
  { path: '', redirectTo: '/home/bestSellers', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'bestSellers', pathMatch: 'full' },
      { path: 'bestSellers', component: BestSellersComponent },
      { path: 'newArrivals', component: NewArrivalsComponent },
      { path: 'specialOffers', component: SpecialOffersComponent }
    ]
  },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'category/:id/:pid', component: CategoryComponent },
  {
    path: 'product/:id', component: ProductComponent, children: [
      { path: 'infoBook', component: InfoAboutBookComponent },
      { path: 'detailsBook', component: DetailsBookComponent }
    ]
  },
  { path: '**', redirectTo: '/home/bestSellers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
