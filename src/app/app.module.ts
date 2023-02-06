import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import {AppMaterialModule} from './app-material/app-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { VendorComponent } from './vendor/vendor.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { HomeService } from './home/home.service';
import { ApiRequestService } from './shared/services/api-request.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeHeaderComponent } from './shared/components/home-header/home-header.component';
import { DietRestrictionComponent } from './checkout/forms/diet-restriction/diet-restriction.component';
import { DentalInsurancesComponent } from './checkout/forms/dental-insurances/dental-insurances.component';
import { EnvironmentAllergiesComponent } from './checkout/forms/environment-allergies/environment-allergies.component';
import { FoodAllergiesComponent } from './checkout/forms/food-allergies/food-allergies.component';
import { KidDoctorComponent } from './checkout/forms/kid-doctor/kid-doctor.component';
import { KidHealthComponent } from './checkout/forms/kid-health/kid-health.component';
import { KidTreatmentComponent } from './checkout/forms/kid-treatment/kid-treatment.component';
import { MedicalInsurancesComponent } from './checkout/forms/medical-insurances/medical-insurances.component';
import { MedicationAllergiesComponent } from './checkout/forms/medication-allergies/medication-allergies.component';
import { SymptomsFormComponent } from './checkout/forms/symptoms-form/symptoms-form.component';
import { StorecreditComponent } from './checkout/storecredit/storecredit.component';
import { ActivityCardComponent } from './shared/components/activity-card/activity-card.component';
import { ActivityDetailsComponent } from './shared/components/activity-details/activity-details.component';
import { AvatarComponent } from './shared/components/avatar/avatar.component';
import { DatePickerComponent } from './shared/components/date-picker/date-picker.component';
import { ViewAddressComponent } from './shared/components/view-address/view-address.component';
import { DaysComponent } from './shared/components/days/days.component';
import { RatingsComponent } from './shared/components/ratings/ratings.component';
import { SessionDetailComponent } from './shared/components/session-detail/session-detail.component';
import { AddToCartComponent } from './shared/components/add-to-cart/add-to-cart.component';
import { LoginRegisterComponent } from './shared/components/login-register/login-register.component';
import { NoDataComponent } from './shared/components/no-data/no-data.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ReviewItemComponent } from './shared/components/review-item/review-item.component';
import { ProviderReviewsComponent } from './provider-reviews/provider-reviews.component';
import { FaqComponent } from './shared/components/faq/faq.component';
import { TermsandconditionsComponent } from './shared/components/termsandconditions/termsandconditions.component';
import { AgmCoreModule } from '@agm/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ActivityHomeComponent } from './shared/components/activity-home/activity-home.component';
import { ActivityInfoComponent } from './shared/components/activity-home/activity-info/activity-info.component';
import { WeekDaysComponent } from './shared/components/week-days/week-days.component';
import { ActivityRegisterComponent } from './shared/components/activity-home/activity-register/activity-register.component';
import { SignInRegisterComponent } from './shared/components/sign-in-register/sign-in-register.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    HomeComponent,
    TestComponent,
    CheckoutComponent,
    HomeHeaderComponent,
    DietRestrictionComponent,
    DentalInsurancesComponent,
    EnvironmentAllergiesComponent,
    FoodAllergiesComponent,
    KidDoctorComponent,
    KidHealthComponent,
    KidTreatmentComponent,
    MedicalInsurancesComponent,
    MedicationAllergiesComponent,
    SymptomsFormComponent,
    StorecreditComponent,
    ActivityCardComponent,
    ActivityDetailsComponent,
    AvatarComponent,
    DatePickerComponent,
    ViewAddressComponent,
    DaysComponent,
    RatingsComponent,
    SessionDetailComponent,
    AddToCartComponent,
    LoginRegisterComponent,
    NoDataComponent,
    FooterComponent,
    ReviewItemComponent,
    ProviderReviewsComponent,
    FaqComponent,
    TermsandconditionsComponent,
    ActivityHomeComponent,
    ActivityInfoComponent,
    WeekDaysComponent,
    ActivityRegisterComponent,
    SignInRegisterComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
	appRoutingModule,
	appRoutingModule,
	AppMaterialModule,
	ReactiveFormsModule,
  NgbModule,
  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaKbVhcX_22R_pRKDYuNA7vox-PtGaDkI',
      libraries: ['places']
    })
  ],
  providers: [HomeService,ApiRequestService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
