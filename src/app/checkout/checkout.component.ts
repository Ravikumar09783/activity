import {OnInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DataService } from '../shared/services/data.service';
import { ActivityHubService } from '../shared/services/activity-hub.service';
import { HomeService } from '../home/home.service';
import { CartService } from '../shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
/* forms */
import { DietRestrictionComponent } from "./forms/diet-restriction/diet-restriction.component";
import { DentalInsurancesComponent } from "./forms/dental-insurances/dental-insurances.component";
import { EnvironmentAllergiesComponent } from "./forms/environment-allergies/environment-allergies.component";
import { FoodAllergiesComponent } from "./forms/food-allergies/food-allergies.component";
import { KidDoctorComponent } from "./forms/kid-doctor/kid-doctor.component";
import { KidHealthComponent } from "./forms/kid-health/kid-health.component";
import { KidTreatmentComponent } from "./forms/kid-treatment/kid-treatment.component";
import { MedicalInsurancesComponent } from "./forms/medical-insurances/medical-insurances.component";
import { MedicationAllergiesComponent } from "./forms/medication-allergies/medication-allergies.component";
import { SymptomsFormComponent } from "./forms/symptoms-form/symptoms-form.component";
import { MatStepper } from '@angular/material/stepper';
/* store credit popup */
import { StorecreditComponent } from "./storecredit/storecredit.component";
import { TermsandconditionsComponent } from '../shared/components/termsandconditions/termsandconditions.component';

import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})

export class CheckoutComponent implements OnInit {
    @ViewChild('cardNumber') cardNumber: ElementRef;
    @ViewChild('cardExpiary') cardExpiary: ElementRef;
    @ViewChild('cardCVC') cardCVC: ElementRef;
    /**
     * phone input
     */
    separateDialCode = true;
    SearchCountryField = SearchCountryField;
    TooltipLabel = TooltipLabel;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
    card: any;
    //cardHandler = this.onChange.bind(this);
    cardError: string;
    
    providerId:any;
    locationId: any;
    /*Forms */
    parentForm: FormGroup;
    //participantForms: FormGroup;
    paymentForm: FormGroup;
    termsForm: FormGroup;
    /* forms*/
    stripeToken: null;
    isEditable = true;
    bookingDetail = [];
    purchaseData:any;
    extendedCares = this.dataservice.extendedCares;
    cartItems = this.dataservice.getCartItems();
    cartDetail:any;
    cartSize = this.cartservice.getCartItemsCount();
    genders = this.dataservice.getGenders();
    maritalStatuses = this.dataservice.getMaritialStatus();
    months = this.dataservice.getMonths();
    expYears = this.dataservice.getYearRange();
    states = this.dataservice.getStates();
    participantForms:any = [];
    purchaseError:string;
    termsAndConditions:any = [];
    validForms = [];
    purchaseDone:boolean;
    submitted:boolean;
	sessionDate: string;
    bookingTypeId: string = 'weekly'
	providerLocDetails: any = {};
	datainfo: any;
	participantFillData: any ={};
    isProcessing = false;
    constructor(private cartservice: CartService, private _formBuilder: FormBuilder, public dialog: MatDialog, private dataservice: DataService, private activityhub: ActivityHubService, private homeprovider: HomeService,
	private route: ActivatedRoute) {  }
    ngOnInit() {
        /* query parameters */
        this.route.queryParams
        .subscribe(params => {
            if(params.providerId && params.locationId){
                this.providerId = params.providerId;
                this.locationId = params.locationId;

            }
        });
		
		
        
        this.normalizeparticipantForms();
        this.updateTermsAndConditions();
        this.parentForm = this._formBuilder.group({
            name: [null, Validators.required],
            guestEmail: [null, [Validators.required, Validators.email]],
            gender: [null],
            countryCode: ['+91'],
            phone: [null, [Validators.required]],
            maritalStatus: [null]
        });
        this.paymentForm = this._formBuilder.group({
            state: [null, Validators.required], 
            line1: [null, Validators.required],
            city : [null, Validators.required],
            pin : [null, Validators.required],
            line2: [null],
        });
        this.termsForm = this._formBuilder.group({
            termsGroup: [null, Validators.required] 
        });

		var keys = Object.keys(localStorage);
		keys.forEach(key=>{
			if(key.includes("new_")) {
			   localStorage.removeItem(key);
			}
		   
		})
		this.loadData();
		
	  //localStorage.removeItem('new_jgOIAKMwese7OnF6OcWX-foodAllergies');
    }
    
    updateTermsAndConditions() {
        this.activityhub.getProviderterms(this.providerId).subscribe(
            (response:any) =>{
                if(response.statusCode === 200) {
                    response.data.forEach((term) => {
                        this.termsAndConditions.push({
                            termId : term.termId._id,
                            isAccepted: true,
                        });
                    });
                }
            },
            (err:any) =>{
                console.log(err);
            }
        );
        
    }
    
    normalizeparticipantForms() {
        let i = 0;
        Object.keys(this.cartItems).forEach((cartKey) => {
            let cartItem = this.cartItems[cartKey];
            /*update session data */
            let participents = cartItem.participants;
            
            /* update booking detail */
            
            /* update session data */
            this.activityhub.getSessionDetail(cartItem.session_id, this.providerId).subscribe(
                (response:any) =>{
                    if(response.statusCode == 200) {
                        let sessionData = response.data;
                        this.cartItems[cartKey]['session_detail'] = sessionData;
                        let booking = {
                            'bookingKey' : cartKey,
                            'sessionId' : cartItem.session_id,
                            'applySiblingDiscount' : sessionData.offersSiblingDiscount,
                            'addedForOneDayOnly' : (!!sessionData.addedForOneDayOnly) ? sessionData.addedForOneDayOnly : false,
                            'additionalChargeDetails' : (!!cartItem.additionalcharges) ? cartItem.additionalcharges : [],
                           //'additionalChargeDetails' : (!!cartItem.additionalChargeDetails) ? cartItem.additionalChargeDetails : [],
                        };
                        if(!!cartItem.extendedCareSelected) {
                            booking['extendedCareSelected'] = cartItem.extendedCareSelected;
                            booking['optedForExtendedCare'] = true;
                        }
                        booking['kids'] = [];
                        /* update booking details */
                        let sessionDetail = cartItem.session_detail;
                        participents.forEach((participent) => {
                            /* add participant to booking */
                            let participantData = participent;
                            participantData['forms'] = {};
                            booking['kids'].push(participantData);
                            /* add participant to booking */
                            //let tmparray = []
                            //this.participantForms[participent._id] = {};
                            //console.log(this.participantForms.participent.indexOf(participent._id));
                            /*this.participantForms[participent._id]['participent'] = participent;
                            this.participantForms[participent._id]['forms'] = {};
                            this.participantForms[participent._id]['forms']['doctors'] = this.getFormValue(participent._id, 'kidsDoctors', sessionDetail);
                            this.participantForms[participent._id]['forms']['dietRestricts'] = this.getFormValue(participent._id, 'kidsDietRestricts', sessionDetail);
                            this.participantForms[participent._id]['forms']['treatments'] = this.getFormValue(participent._id, 'kidsTreatments', sessionDetail);
                            this.participantForms[participent._id]['forms']['symptoms'] = this.getFormValue(participent._id, 'kidsSymptoms', sessionDetail);
                            this.participantForms[participent._id]['forms']['foodAllergies'] = this.getFormValue(participent._id, 'kidsFoodAllergies', sessionDetail);
                            this.participantForms[participent._id]['forms']['environmentAllergies'] = this.getFormValue(participent._id, 'kidsEnvironmentAllergies', sessionDetail);
                            this.participantForms[participent._id]['forms']['medicationAllergies'] = this.getFormValue(participent._id, 'kidsMedicationAllergies', sessionDetail);
                            this.participantForms[participent._id]['forms']['medicalInsurances'] = this.getFormValue(participent._id, 'kidsMedicalInsurances', sessionDetail);
                            this.participantForms[participent._id]['forms']['dentalInsurances'] = this.getFormValue(participent._id, 'kidsDentalInsurances', sessionDetail);
                            this.participantForms[participent._id]['forms']['healthConcerns'] = this.getFormValue(participent._id, 'kidsHehalthConcerns', sessionDetail);*/
                            let uniqueForms = [];
                            uniqueForms['participent'] = participent;
                            uniqueForms['forms'] = {};
                            uniqueForms['forms']['doctors'] = this.getFormValue(participent._id, 'kidsDoctors', sessionDetail);
                            uniqueForms['forms']['dietRestricts'] = this.getFormValue(participent._id, 'kidsDietRestricts', sessionDetail);
                            uniqueForms['forms']['treatments'] = this.getFormValue(participent._id, 'kidsTreatments', sessionDetail);
                            uniqueForms['forms']['symptoms'] = this.getFormValue(participent._id, 'kidsSymptoms', sessionDetail);
                            uniqueForms['forms']['foodAllergies'] = this.getFormValue(participent._id, 'kidsFoodAllergies', sessionDetail);
                            uniqueForms['forms']['environmentAllergies'] = this.getFormValue(participent._id, 'kidsEnvironmentAllergies', sessionDetail);
                            uniqueForms['forms']['medicationAllergies'] = this.getFormValue(participent._id, 'kidsMedicationAllergies', sessionDetail);
                            uniqueForms['forms']['medicalInsurances'] = this.getFormValue(participent._id, 'kidsMedicalInsurances', sessionDetail);
                            uniqueForms['forms']['dentalInsurances'] = this.getFormValue(participent._id, 'kidsDentalInsurances', sessionDetail);
                            uniqueForms['forms']['healthConcerns'] = this.getFormValue(participent._id, 'kidsHealthConcerns', sessionDetail);
                            //this.participantForms.push(tmparray);
                            this.participantForms.push(uniqueForms);
                        }); 
                        
                        this.bookingDetail.push(booking);
                    }
                }
            );
            i++;
        });
    }
    getFormValue(participantId, formKey, sessionData) {
        //console.log(sessionData.activityId.regFormValidations[formKey]);
        if(sessionData.activityId.regFormValidations[formKey] && sessionData.activityId.regFormValidations[formKey] == true) {
            return true;
        }
        /*if(!!this.participantForms[participantId]['forms'] && this.participantForms[participantId]['forms'][formKey] == true) {
            return true
        }*/
        
        return false;
    }
    displayProviderTerms() {
        const dialogRef = this.dialog.open(TermsandconditionsComponent, {data: {providerId: this.providerId}});

        dialogRef.afterClosed().subscribe(result => {
            
        });
    }
    
    openDietDialog(participantId:any) {
        const dialogRef = this.dialog.open(DietRestrictionComponent, {data: {participantId: participantId}, disableClose: true});
		   dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('dietRestricts', participantId, formData);
        });
    }
    openTreatmentDialog(participantId:any) {
        const dialogRef = this.dialog.open(KidTreatmentComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('treatments', participantId, formData);
        });
    }
    openSymptomDialog(participantId:any) {
        const dialogRef = this.dialog.open(SymptomsFormComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('symptoms', participantId, formData);
        });
    }
    
    openFoodAllergyDialog(participantId:any) {
		
		
        const dialogRef = this.dialog.open(FoodAllergiesComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('foodAllergies', participantId, formData);
        });
    }
    
    openEnvAllergyDialog(participantId:any) {
        const dialogRef = this.dialog.open(EnvironmentAllergiesComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('environmentAllergies', participantId, formData);
        });
    }
    openMedElergyDialog(participantId:any) {
        const dialogRef = this.dialog.open(MedicationAllergiesComponent, {data: {participantId: participantId}, disableClose: true});
        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('medicationAllergies', participantId, formData);
        });
    }
    
    updateForms(formKey, participantId, formData) {
        let i = 0;
        this.bookingDetail.forEach((booking) => {
            let j = 0;
            booking['kids'].forEach((participant) => {
                if(participant._id == participantId) {
                    //this.bookingDetail[i]['kids']['forms'][formKey] = [];
                    this.bookingDetail[i]['kids'][j]['forms'][formKey] = formData;
                    //console.log(this.bookingDetail[i]['kids'][j]['forms']);
                    if(!this.validForms[participantId]) {
                        this.validForms[participantId] = {};
                    }
                    this.validForms[participantId][formKey] = true;
					
                }
                j++;
            })
            i++;
        });
		

		this.participantFillData[participantId]=formData;
		const jsonData = JSON.stringify(this.participantFillData)
		localStorage.setItem(participantId+'-'+formKey, jsonData);
        console.log(participantId);
        console.log(formData);
        console.log(this.validForms);
    }
    
    openHealthDialog(participantId:any) {
        const dialogRef = this.dialog.open(KidHealthComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('healthConcerns', participantId, formData);
        });
    }
    
    openDentalInsuranceDialog(participantId) {
        const dialogRef = this.dialog.open(DentalInsurancesComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('dentalInsurance', participantId, formData);
        });
    }
    
    openKidDoctorDialog(participantId) {
        const dialogRef = this.dialog.open(KidDoctorComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('doctors', participantId, formData);
        });
    }
    
    openMedicalInsuranceDialog(participantId) {
        const dialogRef = this.dialog.open(MedicalInsurancesComponent, {data: {participantId: participantId}, disableClose: true});

        dialogRef.afterClosed().subscribe(result => {
            let participantId = result.participant;
            let formData = result.data;
            this.updateForms('medicalInsurance', participantId, formData);
        });
    }
    
    saveContactDetail() {
        this.submitted = true;
        this.isProcessing= true;

        console.log(this.parentForm);
        if(this.parentForm.valid) {
            //your code here
            console.log(this.parentForm);
            this.isProcessing= false;
        }
    }
    updateCart() {
        // update cart data         
        let bookingdetails = JSON.parse(JSON.stringify(this.bookingDetail));
        bookingdetails.forEach((booking) => {
            booking['kidsCount'] = booking['kids'].length;
            delete booking['kids'];
        });
        
        console.log('providerId',this.providerId);
        console.log('bookingDetails',bookingdetails);

        let payload = {
            'storeCreditUsed' : false,
            'providerId' : this.providerId,
            'bookingDetails' : bookingdetails
        }
        this.activityhub.doPriceCalculation(payload).subscribe(
            (response:any) =>{
                console.log(response);
                if(response.statusCode === 201) {
                    this.cartDetail = response.data;
                }
            }
        )
    }
    saveParticipantForms(stepper: MatStepper) {
        //check store credit
        //console.log();
        let requiredForms = 0;
        let filledforms = 0;
        this.participantForms.forEach((participantForm) => {
            Object.keys(participantForm.forms).forEach((key) => {
                //console.log(participantForm.forms[key]);
                if(participantForm.forms[key]) {
                    requiredForms++;
                }
            })
        });

        this.bookingDetail.forEach((booking) => {
            booking.kids.forEach((participant) => {
                let forms = Object.keys(participant.forms);
                filledforms = filledforms + forms.length;
            });
        });
        if(requiredForms == filledforms) {
            this.updateCart();
            stepper.next();
        }else {
            alert('please fill all the forms');
        }
        /*this.activityhub.checkStoreCredit('5b97e4a624f2a44503b7bf2f').subscribe(
            (response:any) =>{
                //if has store credit
                if(response.statusCode === 201) {
                    const dialogRef = this.dialog.open(StorecreditComponent);
                }else {*/
                    //this.updateCart();
                    //stepper.next();
               /* }
                
            }
        )*/
        //check storecredit
        //console.log('participant detail saved');
    }
    async savePaymentDetail(stepper: MatStepper) {
        this.isProcessing= true;
        if(this.paymentForm.valid) {
            //your code here
            const {token, error} = await stripe.createToken(this.card);
            if (token) {
                this.stripeToken = token.id;
                stepper.next();
                 this.isProcessing= false;
            } else {
                this.onError(error);
            }
        }
    }
    
    ngAfterViewInit() {
        this.initiateCardElement();
    }
    initiateCardElement() {
        // Giving a base style here, but most of the style is in scss file
        const cardStyle = {
            base: {
                color: '#32325D',
                fontWeight: 500,
                fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
                fontSize: '16px',
                fontSmoothing: 'antialiased',

                '::placeholder': {
                  color: '#CFD7DF',
                },
                ':-webkit-autofill': {
                  color: '#e39f48',
                },
              },
              invalid: {
                color: '#E25950',

                '::placeholder': {
                  color: '#FFCCA5',
                },
              },
        };
        const elementClasses = {
            focus: 'focused',
            empty: 'empty',
            invalid: 'invalid',
          };
        let cardNumber  = elements.create('cardNumber',  {style: cardStyle , classes: elementClasses});
        cardNumber.mount(this.cardNumber.nativeElement);
        
        let cardExpiary  = elements.create('cardExpiry',  {style: cardStyle, classes: elementClasses });
        cardExpiary.mount(this.cardExpiary.nativeElement);
        
        let cardCVC  = elements.create('cardCvc',  {style: cardStyle, classes: elementClasses });
        cardCVC.mount(this.cardCVC.nativeElement);
        
        this.card = cardNumber;
        //this.card.addEventListener('change', this.cardHandler);
    }

    onError(error) {
        if (error.message) {
            this.cardError = error.message;
        }
    }
    makePurchase(stepper: MatStepper) {
        let bookingdetails = JSON.parse(JSON.stringify(this.bookingDetail));
        let parentDetail = JSON.parse(JSON.stringify(this.parentForm.value));
        parentDetail.countryCode = parentDetail.phone.dialCode;
        let phonenumber = parentDetail.phone.number;
        phonenumber = phonenumber.replace(/-/g, '');
        parentDetail.phone = phonenumber;
        if(!parentDetail.gender) {
            delete parentDetail['gender']; 
        }
        if(!parentDetail.maritalStatus) {
            delete parentDetail['maritalStatus']; 
        }
        
        bookingdetails.forEach((booking) => {
            booking['kids'].forEach((participant) => {
                delete  participant['_id'];
               delete  participant['age'];
            });
            delete booking['bookingKey'];
        });
        if(this.termsForm.valid) {
            let purchaseData = {
                'providerId' : this.providerId,
                'parent' : parentDetail,
                'paymentAddress' : this.paymentForm.value,
                'bookingDetails' : bookingdetails,
                'stripeToken' : this.stripeToken,
                'paymentMethod' : 'card', // or free id no payable amount
                'terms' : this.termsAndConditions,
                'offset' : 330
            };

            this.activityhub.purchaseSession(purchaseData).subscribe(
                (response:any) =>{
                    this.purchaseDone = true;
                    this.cartservice.clearCart();
					localStorage.clear();
					var originpath=window.location.origin+'?providerId='+this.providerId+'&locationId='+this.locationId;
                    window.location.href = originpath;
                },
                (err:any) =>{
                    console.log(err);
                    this.purchaseError = err.error.message;
                }
            );
        }
    }
	
	loadData(){
	this.homeprovider.loadDashboardData(this.providerId, this.locationId,this.bookingTypeId, this.sessionDate).subscribe(
      response =>{
                if(response.statusCode === 200) {
					
					if(response.data){
						
						this.providerLocDetails = response.data
						//console.log(this.providerLocDetails);
					}
                }
            },
            (err:any) =>{
                console.log(err);
            }
			);
			
	}
}