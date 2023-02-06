import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-medical-insurances',
  templateUrl: './medical-insurances.component.html',
  styleUrls: ['./medical-insurances.component.css']
})
export class MedicalInsurancesComponent implements OnInit {
    MedicalInsurance: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<MedicalInsurancesComponent>) { }
    isAvailable:boolean;
    ngOnInit(): void {
        //updateParticipant();
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-medicalInsurance')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-medicalInsurance'));
			
			console.log(userFillForm[participantData]);
			this.MedicalInsurance = this._formBuilder.group({
            isAvailable : [userFillForm[participantData].isAvailable],
            subscribersName : [userFillForm[participantData].subscribersName],
            groupNo : [userFillForm[participantData].groupNo],
            policyNo : [userFillForm[participantData].policyNo],
     
        });
		
			
		
			
		}else{
		
        this.MedicalInsurance = this._formBuilder.group({
            isAvailable : [false],
            subscribersName : [null],
            groupNo : [null],
            policyNo : [null]
        });
		
		}
    }
    addInsurance(event) {
        if(event.checked){
            this.isAvailable = true;
            this.MedicalInsurance.get('subscribersName').setValidators(Validators.required);
            this.MedicalInsurance.get('subscribersName').updateValueAndValidity();
            
            this.MedicalInsurance.get('groupNo').setValidators(Validators.required);
            this.MedicalInsurance.get('groupNo').updateValueAndValidity();
            
            this.MedicalInsurance.get('policyNo').setValidators(Validators.required);
            this.MedicalInsurance.get('policyNo').updateValueAndValidity();
        }else {
            this.isAvailable = false;
            this.MedicalInsurance.get('subscribersName').clearValidators();
            this.MedicalInsurance.get('subscribersName').updateValueAndValidity();
            
            this.MedicalInsurance.get('groupNo').clearValidators();
            this.MedicalInsurance.get('groupNo').updateValueAndValidity();
            
            this.MedicalInsurance.get('policyNo').clearValidators();
            this.MedicalInsurance.get('policyNo').updateValueAndValidity();
        }
    }
    save() {
        if(this.MedicalInsurance.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.MedicalInsurance.value});
        }else {
            //alert('heyyyy');
        }
    }
}
