import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dental-insurances',
  templateUrl: './dental-insurances.component.html',
  styleUrls: ['./dental-insurances.component.css']
})
export class DentalInsurancesComponent implements OnInit {
    DentalInsurances: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<DentalInsurancesComponent>) { }
    isAvailable:boolean;
    ngOnInit(): void {
        //updateParticipant();
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-dentalInsurance')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-dentalInsurance'));
			
			console.log(userFillForm[participantData]);
			this.DentalInsurances = this._formBuilder.group({
            isAvailable : [userFillForm[participantData].isAvailable],
            subscribersName : [userFillForm[participantData].subscribersName],
            groupNo : [userFillForm[participantData].groupNo],
            policyNo : [userFillForm[participantData].policyNo],
     
        });
		
				
			
		}else{
        this.DentalInsurances = this._formBuilder.group({
            isAvailable: [false],
            subscribersName : [null],
            groupNo  : [null],
            policyNo : [null]
        });
		
		}
    }
    addInsurance(event) {
        if(event.checked){
            this.isAvailable = true;
            this.DentalInsurances.get('subscribersName').setValidators(Validators.required);
            this.DentalInsurances.get('subscribersName').updateValueAndValidity();
            
            this.DentalInsurances.get('groupNo').setValidators(Validators.required);
            this.DentalInsurances.get('groupNo').updateValueAndValidity();
            
            this.DentalInsurances.get('policyNo').setValidators(Validators.required);
            this.DentalInsurances.get('policyNo').updateValueAndValidity();
        }else {
            this.isAvailable = false;
            this.DentalInsurances.get('subscribersName').clearValidators();
            this.DentalInsurances.get('subscribersName').updateValueAndValidity();
            
            this.DentalInsurances.get('groupNo').clearValidators();
            this.DentalInsurances.get('groupNo').updateValueAndValidity();
            
            this.DentalInsurances.get('policyNo').clearValidators();
            this.DentalInsurances.get('policyNo').updateValueAndValidity();
        }
    }
    save() {
        if(this.DentalInsurances.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.DentalInsurances.value});
        }else {
            //alert('heyyyy');
            console.log(this.DentalInsurances);
        }
    }
}
