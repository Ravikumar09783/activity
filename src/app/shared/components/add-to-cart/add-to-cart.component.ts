import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ActivityHubService } from '../../services/activity-hub.service';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';

import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.css'],
})
export class AddToCartComponent implements OnInit {
    sessionDetail:any;
    providerId:any;
    locationId:any;
    hasExtendedCare = false;
    cartPrice: number;
    isDeleteDisable = true;
    profileParticipants = [];
    seats = 1;
    participantSeats = new Array(10);
    selectedAddtlService = [];
    selectedExtCare:any;

    displayHeader = false;
    cartItem:any;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private activityhub: ActivityHubService, private _formBuilder: FormBuilder, private route: ActivatedRoute, private dialogRef: MatDialogRef<AddToCartComponent>, private cartservice: CartService, private dataservice: DataService) { }
    genders = this.dataservice.getGenders();
    AtcForm = this._formBuilder.group({
        session_id: [this.data.sessionId],
        extendedCareSelected: [null],
        additionalcharges: this._formBuilder.array([]),
        participants: this._formBuilder.array([])
    });
    
    @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
        /* 17-july-2021 changes
		if(event.srcElement.scrollTop < 20) {
            this.displayHeader = false;
        }*/
        if(this.displayHeader && (event.srcElement.scrollTop > 45 || event.srcElement.scrollTop < 53)) {
            return;
        }
        if(event.srcElement.scrollTop > 50) {
            this.displayHeader = true;
        }else {
            this.displayHeader = false;
        }
	
    }

    ngOnInit(): void {
        /* query parameters */
        this.route.queryParams
        .subscribe(params => {
            if(params.providerId && params.locationId){
                this.providerId = params.providerId;
                this.locationId = params.locationId;
            }
        });

        //this.updateParticipants();
        /* if cart edit mode */
        this.updateCart();
        this.defaultParticipants();
        this.updateParticipants(null);
        this.updateSessionDetail();
        this.doCalculation();
    }
    get participants(): FormArray {return this.AtcForm.get('participants') as FormArray; }
    
    updateCart() {
	
        if(this.data.itemKey) {
            this.cartItem = this.cartservice.getCartItem(this.data.itemKey);
            this.seats = this.cartItem.participants.length;
        }
    }
    
    updateParticipants(cachedParticipant: any) {
        if(this.cartItem) {
            let i = 0;
            this.cartItem.participants.forEach((participant) => {
                let control = this.participants.at(i);
                control.get('_id').patchValue(participant._id);
                control.get('firstName').patchValue(participant.firstName);
                control.get('lastName').patchValue(participant.lastName);
                control.get('knownAs').patchValue(participant.knownAs);
                control.get('gender').patchValue(participant.gender);
                control.get('age').patchValue(participant.age);
                i++;
            });
            
            this.selectedExtCare = this.cartItem.extendedCareSelected
        }else {
            console.log('hey, here are participants');
            console.log(cachedParticipant);
        }
    }
    
    doCalculation() {
        let details = {};
        details['providerId'] = this.providerId;

        details['bookingDetails'] = [{
            'sessionId' : this.data.sessionId,
            'kidsCount' : this.seats,
            'additionalChargeDetails' : this.selectedAddtlService,
            'extendedCareSelected' : (typeof this.selectedExtCare != undefined) ? this.selectedExtCare : null,
            'optedForExtendedCare' : this.selectedExtCare ? true : false
        }];
        this.activityhub.doPriceCalculation(details).subscribe(
            (response:any) =>{
                this.cartPrice = response.data.payableAmount;
            }
        );
    }
    selectParticipant(event) {
        const formArray: FormArray = this.AtcForm.get('participants') as FormArray;
        if(event.checked){
            this.activityhub.participantDetail(event.source.value).subscribe(
            (response:any) =>{
                //this.participantDetail = response.data.kidProfile;
                this.participants.push(this._formBuilder.group(response.data.kidProfile));
            });
            
        }else {
            let i: number = 0;

            this.participants.controls.forEach((ctrl: FormControl) => {
                if(ctrl.value._id == event.source.value) {
                    // Remove the unselected element from the arrayForm
                    this.participants.removeAt(i);
                    return;
                }

                i++;
            });
        }
        this.updateAgeValidation();
        this.doCalculation();
    }
    
    onaextndChange(event) {
        //console.log(event);
        //this.selectedExtCare = 
        this.selectedExtCare = event.value;
        this.doCalculation();
    }
    
    onaddtlChange(event) {
        const formArray: FormArray = this.AtcForm.get('additionalcharges') as FormArray;
        //console.log(event, ' ', event.checked,' ', event.source.value);
        /* Selected */
        if(event.checked){
            // Add a new control in the arrayForm
            formArray.push(new FormControl(event.source.value, [Validators.required]));
            this.selectedAddtlService.push(event.source.value);
            //formArray.push({'_id' : event.source.value});
        }
        /* unselected */
        else{
            // find the unselected element
            let i: number = 0;
            let key = 0;
            /*this.selectedAddtlService.forEach((AddtlService) => {
                if(AddtlService == event.source.value) {
                    delete this.selectedAddtlService[key];
                }
                key++;
            });*/
            var index = this.selectedAddtlService.indexOf(event.source.value);
            if (index > -1) {
                this.selectedAddtlService.splice(index, 1);
            }
            formArray.controls.forEach((ctrl: FormControl) => {
                if(ctrl.value == event.source.value) {
                    // Remove the unselected element from the arrayForm
                    formArray.removeAt(i);
                    return;
                }

                i++;
            });
        }
        this.doCalculation();
    }
    deleteParticipantForm(Kidnumber, event) {
		//console.log(this.seats);
        if(this.seats > 1) {
			 this.seats--;
             this.isDeleteDisable = false;
    		    /* 20-july-2021 changes start*/
    			if(confirm("Are you sure you want to remove this item from the cart? ")) 
                {
        			this.participants.removeAt(Kidnumber);
                    this.doCalculation();
    			}
    			/* 20-july-2021 changes end*/			
        }else {
            this.isDeleteDisable = true;
        }
    }
    updateSessionDetail() {
        this.activityhub.getSessionDetail(this.data.sessionId, this.providerId).subscribe(
                (response:any) =>{
                    if(response.statusCode == 200) {
                        this.sessionDetail = response.data;
                        let extendedCare = this.sessionDetail.extendedCareDetails;
                        if(!!extendedCare.afterCare || !!extendedCare.earlyCare || !!extendedCare.combined) {
                            this.hasExtendedCare = true;
                        }
                        
                        this.updateAgeValidation();
                    }
                });
    }
    updateAgeValidation() {
        let ageRange = this.sessionDetail.activityId.ageRange;
        this.participants.controls.forEach((ctrl: FormControl) => {
            ctrl.get('age').setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(ageRange.from), Validators.max(ageRange.to)]);
            ctrl.get('age').updateValueAndValidity();
        });
    }
    /*updateParticipants() {
        this.activityhub.getUserKids().subscribe(
        (response:any) =>{
            if(response.statusCode == 200) {
                this.profileParticipants = response.data;
            }
        });
        
    }*/
    addSeatInfo(seatCount, event) {
        seatCount = seatCount + 1;
        let difference = 0; let isreduced = null;
        if(seatCount > this.seats) {
            difference = seatCount - this.seats;
            isreduced = false;
        }else {
            difference = this.seats - seatCount;
            isreduced = true;
        }
        this.seats = seatCount;
        //console.log(`old seat is : ${this.seats} , new selected is: ${seatCount}difference is ${difference}`);
        if(isreduced) {
            this.participants.clear();
            for(let i = 1; i <= this.seats; i++) {
                this.participants.push(this.createParticipants());
            } 
        }else {
            for(let i = 1; i <= difference; i++) {
                this.participants.push(this.createParticipants());
            } 
        }
        //alert(this.seats);
        if(this.seats == 1) {
            this.isDeleteDisable = true;
        }else {
            this.isDeleteDisable = false;
        }
        this.updateAgeValidation();
        this.updateParticipants(null);
        this.doCalculation();
    }
    
    defaultParticipants() {
        for(let i = 1; i <= this.seats; i++) {
            this.participants.push(this.createParticipants());
        } 
        
        //return this.participants;
        
        return this.participants;
    }
    createParticipants(): FormGroup {
        return this._formBuilder.group({
            _id : [this.createparticipantId()],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            knownAs: [null],
            gender: [null, [Validators.required]],
            age: [null]
            /*school: [null],
            grade: [null],
            track: [null]*/
        });
        
        
    }
    
    /**
     * create key for cart item
     */
    createparticipantId() {
        let length = 20;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return "new_"+result;
    }
    addToCart(){ 
        if(this.AtcForm.valid) {

            let cartItem = this.AtcForm.value;
            cartItem['session_detail'] = {};
            cartItem['session_detail']['name'] = this.sessionDetail.name;
            cartItem['session_detail']['sessionImage'] = this.sessionDetail.sessionImage.original;
            cartItem['price'] = this.cartPrice;
            if(this.data.itemKey) {
                this.cartservice.updateCartItem(this.data.itemKey, cartItem);
            }else {
                this.cartservice.addCartItem(cartItem);
            }
            this.dialogRef.close();
        }else {
            console.log(this.AtcForm);
        }
    }
    
    
}
