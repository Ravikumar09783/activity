import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-medication-allergies',
  templateUrl: './medication-allergies.component.html',
  styleUrls: ['./medication-allergies.component.css']
})
export class MedicationAllergiesComponent implements OnInit {
    medicationEllergies: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<MedicationAllergiesComponent>) { }
    isNoneSected:any;
    showAdditional:boolean;
    ngOnInit(): void {
        //updateParticipant();
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-medicationAllergies')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-medicationAllergies'));
			this.medicationEllergies = this._formBuilder.group({
            none : [userFillForm[participantData].none],
            penicillin : [userFillForm[participantData].penicillin],
            additionalSpecifics : [userFillForm[participantData].additionalSpecifics],
       
        });
		
		if(this.medicationEllergies.value.none == true){
			
		 this.isNoneSected = true;
            this.checkuncheckAll();
		}
		}else{
		
		this.medicationEllergies = this._formBuilder.group({
			none: [false],
			penicillin: [false],
			additionalSpecifics  : [""],
			});
		}
    }
    selectNone(event) {
        if(event.checked){
            this.isNoneSected = true;
            this.checkuncheckAll();
        }else {
            this.isNoneSected = false;
        }
    }
    
    checkuncheckAll() {
        
    }
    
    selectAdditional(event) {
        if(event.checked){
            this.showAdditional = true;
            this.medicationEllergies.get('additionalSpecifics').setValidators(Validators.required);
            this.medicationEllergies.get('additionalSpecifics').updateValueAndValidity();
        }else {
            this.showAdditional = false;
            this.medicationEllergies.get('additionalSpecifics').clearValidators();
            this.medicationEllergies.get('additionalSpecifics').updateValueAndValidity();
        }
    }
    save() {
        if(this.medicationEllergies.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.medicationEllergies.value});
        }else {
            //alert('heyyyy');
        }
    }
}
