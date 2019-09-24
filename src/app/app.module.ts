import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NpnSliderModule } from 'npn-slider';
// import { Subscription } from 'rxjs';
import {
  NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION,
  PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './preloader-config'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BestSellersComponent } from './pages/home/best-sellers/best-sellers.component';
import { NewArrivalsComponent } from './pages/home/new-arrivals/new-arrivals.component';
import { SpecialOffersComponent } from './pages/home/special-offers/special-offers.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { InfoAboutBookComponent } from './pages/product/info-about-book/info-about-book.component';
import { DetailsBookComponent } from './pages/product/details-book/details-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BestSellersComponent,
    NewArrivalsComponent,
    SpecialOffersComponent,
    CategoryComponent,
    ProductComponent,
    InfoAboutBookComponent,
    DetailsBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgImageSliderModule,
    NgbModule,
    NpnSliderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
