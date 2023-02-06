import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-symptoms-form',
  templateUrl: './symptoms-form.component.html',
  styleUrls: ['./symptoms-form.component.css']
})
export class SymptomsFormComponent implements OnInit {
    Symptoms: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<SymptomsFormComponent>) { }
    isNoneSected:boolean;
    showMildOther:boolean;
    showExtreactiveOther:boolean;
    ngOnInit(): void {
        //updateParticipant();
		
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-symptoms'))
		{
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-symptoms'));
			this.Symptoms = this._formBuilder.group({
					none: [userFillForm[participantData].none],
					extremelyReactive: this._formBuilder.group({
						lung: [userFillForm[participantData].extremelyReactive.lung],
						mouth: [userFillForm[participantData].extremelyReactive.mouth],
						heart: [userFillForm[participantData].extremelyReactive.heart],
						skin: [userFillForm[participantData].extremelyReactive.skin],
						throat: [userFillForm[participantData].extremelyReactive.throat],
						digestive: [userFillForm[participantData].extremelyReactive.digestive],
						other: [userFillForm[participantData].extremelyReactive.other]
					}),
					mildSymptoms: this._formBuilder.group({
						mildNausea: [userFillForm[participantData].mildSymptoms.mildNausea],
						mouth: [userFillForm[participantData].mildSymptoms.mouth],
						skin: [userFillForm[participantData].mildSymptoms.skin],
						other: [userFillForm[participantData].mildSymptoms.other]
					})
				});
				
			if(this.Symptoms.value.none == true){
				
			 this.isNoneSected = true;
				this.checkuncheckAll();
			}
		}else{
			
				this.Symptoms = this._formBuilder.group({
					none: [false],
					extremelyReactive: this._formBuilder.group({
						lung: [false],
						mouth: [false],
						heart: [false],
						skin: [false],
						throat: [false],
						digestive: [false],
						other: [""]
					}),
					mildSymptoms: this._formBuilder.group({
						mildNausea: [false],
						mouth: [false],
						skin: [false],
						other: [""]
					})
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
    mildOther(event) {
        if(event.checked){
            this.showMildOther = true;
        }else {
            this.showMildOther = false;
        }
    }
    extreactiveOther(event) {
        if(event.checked){
            this.showExtreactiveOther = true;
        }else {
            this.showExtreactiveOther = false;
        }
    }
    save() {
        if(this.Symptoms.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.Symptoms.value});
        }else {
            //alert('heyyyy');
        }
    }
}
