import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-kid-treatment',
  templateUrl: './kid-treatment.component.html',
  styleUrls: ['./kid-treatment.component.css']
})
export class KidTreatmentComponent implements OnInit {
    Treatment: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<KidTreatmentComponent>) { }
    showAdditional:boolean;
    isNoneSected:boolean;
    isEpiNoSymptoms: boolean;
    isAntihistamine:boolean;
    isotherMedication: boolean;
    ngOnInit(): void {
        //updateParticipant();
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-treatments')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-treatments'));
			this.Treatment = this._formBuilder.group({
            none : [userFillForm[participantData].none],
            epiAnySymptoms : [userFillForm[participantData].epiAnySymptoms],
            epiSevereSymptoms : [userFillForm[participantData].epiSevereSymptoms],
            epiNoSymptoms: this._formBuilder.group({
					epiMedication: [userFillForm[participantData].epiNoSymptoms.epiMedication],
					dosage: [userFillForm[participantData].epiNoSymptoms.dosage]
				}),
				antihistamineMildSymptoms: [false],
				antihistamineSevereSymptoms: this._formBuilder.group({
					medication: [userFillForm[participantData].antihistamineSevereSymptoms.medication],
					dosage: [userFillForm[participantData].antihistamineSevereSymptoms.dosage]
				}),
				otherMedication: this._formBuilder.group({
					detail: [userFillForm[participantData].otherMedication.detail],
					medication: [userFillForm[participantData].otherMedication.medication],
					dosage: [userFillForm[participantData].otherMedication.dosage]
				}),
				additionalSpecifics: [userFillForm[participantData].additionalSpecifics]
          
        });
		
		if(this.Treatment.value.none == true){
			
		 this.isNoneSected = true;
            this.checkuncheckAll();
		}
		}else{
		
			this.Treatment = this._formBuilder.group({
				none : [false],
				epiAnySymptoms : [false],
				epiSevereSymptoms : [false],
				epiNoSymptoms: this._formBuilder.group({
					epiMedication: [""],
					dosage: [""]
				}),
				antihistamineMildSymptoms: [false],
				antihistamineSevereSymptoms: this._formBuilder.group({
					medication: [""],
					dosage: [""]
				}),
				otherMedication: this._formBuilder.group({
					detail: [""],
					medication: [""],
					dosage: [""]
				}),
				additionalSpecifics: [""]
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
            this.Treatment.get('additionalSpecifics').setValidators(Validators.required);
            this.Treatment.get('additionalSpecifics').updateValueAndValidity();
        }else {
            this.showAdditional = false;
            this.Treatment.get('additionalSpecifics').clearValidators();
            this.Treatment.get('additionalSpecifics').updateValueAndValidity();
        }
    }
    showEpiNoSymptoms(event) {
        if(event.checked){
            this.isEpiNoSymptoms = true;
        }else {
            this.isEpiNoSymptoms = false;
        }
    }
    showAntihistamineSevereSymptoms(event) {
        if(event.checked){
            this.isAntihistamine = true;
        }else {
            this.isAntihistamine = false;
        }
    }
    showOtherMedication(event) {
        if(event.checked){
            this.isotherMedication = true;
        }else {
            this.isotherMedication = false;
        }
    }
    save() {
        if(this.Treatment.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.Treatment.value});
        }else {
            //alert('heyyyy');
        }
    }    
}
