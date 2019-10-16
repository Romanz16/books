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
import { AngularFireFunctionsModule } from '@angular/fire/functions';

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
import { FilterTopNewPipe } from './shared/pipes/filter-top-new.pipe';
import { FilterDiscountsPipe } from './shared/pipes/filter-discounts.pipe';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './pages/search/search.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { LoginComponent } from './pages/login/login.component';
import { StorageModule } from '@ngx-pwa/local-storage';

import { AuthService } from "./shared/services/auth.service";
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { MyAccountComponent } from './pages/login/my-account/my-account.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SortByDatePipe } from './shared/pipes/sort-by-date.pipe';
import { ProdByIdPipe } from './shared/pipes/prod-by-id.pipe';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { SendgridModule,  SendgridService  } from 'ngx-sendgrid';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {NgxMaskModule, IConfig} from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
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
    FilterPublishingPipe,
    FilterTopNewPipe,
    FilterDiscountsPipe,
    AdminDiscountsComponent,
    SearchComponent,
    SearchPipe,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    MyAccountComponent,
    OrdersComponent,
    SortByDatePipe,
    ProdByIdPipe,
    AdminOrdersComponent
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
    AngularFireFunctionsModule,
    MatSliderModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    StorageModule.forRoot({ IDBNoWrap: true }),
    BrowserAnimationsModule,
    ToastrModule.forRoot( {  timeOut: 3000,
      preventDuplicates: true,}),
    CommonModule,
    NgxMaskModule.forRoot(options),
    SendgridModule.forRoot({token:'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'})
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
