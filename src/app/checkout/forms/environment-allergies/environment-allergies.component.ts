import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-environment-allergies',
  templateUrl: './environment-allergies.component.html',
  styleUrls: ['./environment-allergies.component.css']
})
export class EnvironmentAllergiesComponent implements OnInit {
    EnvironmentAllergy: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<EnvironmentAllergiesComponent>) { }
    showadditional: boolean;
    isNoneSected: boolean;
    ngOnInit(): void {
        //updateParticipant();
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-environmentAllergies')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-environmentAllergies'));
			console.log(userFillForm);
			this.EnvironmentAllergy = this._formBuilder.group({
			none : [userFillForm[participantData].none],
            latex : [userFillForm[participantData].latex],
            alcoholRub : [userFillForm[participantData].alcoholRub],
            grass : [userFillForm[participantData].grass],
            seasonal :[userFillForm[participantData].seasonal],
            cats : [userFillForm[participantData].cats],
            dogs : [userFillForm[participantData].dogs],
            insectStings : [userFillForm[participantData].insectStings],
            plants : [userFillForm[participantData].plants],
            additionalSpecifics : [userFillForm[participantData].additionalSpecifics]
          
        });
		
		if(this.EnvironmentAllergy.value.none == true){
			
		 this.isNoneSected = true;
            this.checkuncheckAll();
		}
		}else{
			this.EnvironmentAllergy = this._formBuilder.group({
				none : [false],
				latex : [false],
				alcoholRub : [false],
				grass : [false],
				seasonal : [false],
				cats : [false],
				dogs : [false],
				insectStings : [false],
				plants : [false],
				additionalSpecifics : [""]
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
    addOtherInfo(event) {
        if(event.checked){
            this.showadditional = true;
            this.EnvironmentAllergy.get('additionalSpecifics').setValidators(Validators.required);
            this.EnvironmentAllergy.get('additionalSpecifics').updateValueAndValidity();
        }else {
            this.showadditional = false;
            this.EnvironmentAllergy.get('additionalSpecifics').clearValidators();
            this.EnvironmentAllergy.get('additionalSpecifics').updateValueAndValidity();
        }
    }
    save() {
        if(this.EnvironmentAllergy.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.EnvironmentAllergy.value});
        }else {
            //alert('heyyyy');
        }
    }
}
