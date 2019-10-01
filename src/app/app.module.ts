import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { ArrayfilterPipe } from './shared/pipes/arrayfilter.pipe';
import { ObjectToArrayPipe } from './shared/pipes/object-to-array.pipe';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FilterCategoryPipe } from './shared/pipes/filter-category.pipe';
import { FilterPricePipe } from './shared/pipes/filter-price.pipe';
import { FilterAuthorPipe } from './shared/pipes/filter-author.pipe';
import { FilterYearPipe } from './shared/pipes/filter-year.pipe';
import { FilterBindingPipe } from './shared/pipes/filter-binding.pipe';
import { FilterPublishingPipe } from './shared/pipes/filter-publishing.pipe';


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
    DetailsBookComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminSubCategoryComponent,
    AdminProductComponent,
    ArrayfilterPipe,
    ObjectToArrayPipe,
    FilterCategoryPipe,
    FilterPricePipe,
    FilterAuthorPipe,
    FilterYearPipe,
    FilterBindingPipe,
    FilterPublishingPipe
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
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, BrowserAnimationsModule, // imports firebase/storage only needed for storage features
    MatSliderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
