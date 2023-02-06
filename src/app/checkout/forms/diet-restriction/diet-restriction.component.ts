import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-diet-restriction',
  templateUrl: './diet-restriction.component.html',
  styleUrls: ['./diet-restriction.component.css']
})
export class DietRestrictionComponent implements OnInit {
    DietRestriction: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<DietRestrictionComponent>) { }
    isNoneSected:boolean;
    showAdditional:boolean;
	
    ngOnInit(): void {
        //updateParticipant();
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-dietRestricts')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-dietRestricts'));
			this.DietRestriction = this._formBuilder.group({
            none : [userFillForm[participantData].none],
            vegetarian : [userFillForm[participantData].vegetarian],
            noPork : [userFillForm[participantData].noPork],
            vegan :[userFillForm[participantData].vegan],
            lactoseIntolerant : [userFillForm[participantData].lactoseIntolerant],
            celiacDisease : [userFillForm[participantData].celiacDisease],
            additionalSpecifics : [userFillForm[participantData].additionalSpecifics]
          
        });
		
		if(this.DietRestriction.value.none == true){
			
		 this.isNoneSected = true;
            this.checkuncheckAll();
		}
		}else{
		
        this.DietRestriction = this._formBuilder.group({
            none : [false],
            vegetarian : [false],
            noPork   : [false],
            vegan  : [false],
            lactoseIntolerant : [false],
            celiacDisease : [false],
            additionalSpecifics : [""],
			
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
            this.DietRestriction.get('additionalSpecifics').setValidators(Validators.required);
            this.DietRestriction.get('additionalSpecifics').updateValueAndValidity();
        }else {
            this.showAdditional = false;
            this.DietRestriction.get('additionalSpecifics').clearValidators();
            this.DietRestriction.get('additionalSpecifics').updateValueAndValidity();
        }
    }
    save() {
		
        if(this.DietRestriction.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.DietRestriction.value});
        }else {
            //alert('heyyyy');
        }
    }
}
