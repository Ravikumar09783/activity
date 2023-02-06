import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-food-allergies',
  templateUrl: './food-allergies.component.html',
  styleUrls: ['./food-allergies.component.css']
})
export class FoodAllergiesComponent implements OnInit {
    FoodAllergy: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<FoodAllergiesComponent>) { }
    showadditional: boolean;
    isNoneSected: boolean;
    ngOnInit(): void {
        //updateParticipant();
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-foodAllergies')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-foodAllergies'));
			this.FoodAllergy = this._formBuilder.group({
            none : [userFillForm[participantData].none],
            nuts : [userFillForm[participantData].nuts],
            milk : [userFillForm[participantData].milk],
            cheese :[userFillForm[participantData].cheese],
            eggs : [userFillForm[participantData].eggs],
            wheat : [userFillForm[participantData].wheat],
            soy : [userFillForm[participantData].soy],
            additionalSpecifics : [userFillForm[participantData].additionalSpecifics]
        });
		
		if(this.FoodAllergy.value.none == true){
			
		 this.isNoneSected = true;
            this.checkuncheckAll();
		}
		}else{
		
        this.FoodAllergy = this._formBuilder.group({
            none : [false],
            nuts : [false],
            milk : [false],
            cheese : [false],
            eggs : [false],
            wheat : [false],
            soy : [false],
            additionalSpecifics : [""]
        });
		}
    }
    selectNone(event) {
        if(event.checked ){

            this.isNoneSected = true;
            this.checkuncheckAll();
        }else {
            this.isNoneSected = false;
        }
    }
    
    checkuncheckAll() {
        
    }
    addOtherInfo(event) {
        if(event.checked){
            this.showadditional = true;
            this.FoodAllergy.get('additionalSpecifics').setValidators(Validators.required);
            this.FoodAllergy.get('additionalSpecifics').updateValueAndValidity();
        }else {
            this.showadditional = false;
            this.FoodAllergy.get('additionalSpecifics').clearValidators();
            this.FoodAllergy.get('additionalSpecifics').updateValueAndValidity();
        }
    }
    save() {
        if(this.FoodAllergy.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.FoodAllergy.value});
        }else {
            console.log();
        }
    }
	
	
}
