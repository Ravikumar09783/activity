import { Component, OnInit, Inject } from '@angular/core';

import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-kid-health',
  templateUrl: './kid-health.component.html',
  styleUrls: ['./kid-health.component.css']
})
export class KidHealthComponent implements OnInit {
    KidHealth: FormGroup;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<KidHealthComponent>) { }
    showadditional: boolean;
    isNoneSected: boolean;
    ngOnInit(): void {
        //updateParticipant();
		
		const participantData=this.data.participantId;
		if(localStorage.getItem(participantData+'-healthConcerns')){
			const userFillForm=JSON.parse(localStorage.getItem(participantData+'-healthConcerns'));
			this.KidHealth = this._formBuilder.group({
            none : [userFillForm[participantData].none],
            add : [userFillForm[participantData].add],
            onMedicationForAdd : [userFillForm[participantData].onMedicationForAdd],
            adhd :[userFillForm[participantData].adhd],
            onMedicationForAdhd : [userFillForm[participantData].onMedicationForAdhd],
            emotionalProblems : [userFillForm[participantData].emotionalProblems],
            behaviorProblems : [userFillForm[participantData].behaviorProblems],
            heartDeseaseOrDefect : [userFillForm[participantData].heartDeseaseOrDefect],
            headachesOrMigrations : [userFillForm[participantData].headachesOrMigrations],
            concussionOrHeadInjury : [userFillForm[participantData].concussionOrHeadInjury],
            eczemaOrPsoriasis : [userFillForm[participantData].eczemaOrPsoriasis],
            eyeglasses : [userFillForm[participantData].eyeglasses],
            sprainsOrFracturesOrDislocations : [userFillForm[participantData].sprainsOrFracturesOrDislocations],
            majorSurgeryOrIllness : [userFillForm[participantData].majorSurgeryOrIllness],
            heatStrokeOrExhaustion : [userFillForm[participantData].heatStrokeOrExhaustion],
            seizuresOrEpilepsy : [userFillForm[participantData].seizuresOrEpilepsy],
            diabetesType1 : [userFillForm[participantData].diabetesType1],
            diabetesType2 : [userFillForm[participantData].diabetesType2],
            insulin : [userFillForm[participantData].insulin],
            hearingLoss : [userFillForm[participantData].hearingLoss],
            visionLoss : [userFillForm[participantData].visionLoss],
            contagiousDisease : [userFillForm[participantData].contagiousDisease],
            otherSkinCondition : [userFillForm[participantData].otherSkinCondition],
            additionalSpecifics : [userFillForm[participantData].additionalSpecifics],
        });
		
		if(this.KidHealth.value.none == true){
			
		 this.isNoneSected = true;
            this.checkuncheckAll();
		}
		}else{
		
        this.KidHealth = this._formBuilder.group({
            none : [false],
            add : [false],
            onMedicationForAdd : [false],
            adhd : [false],
            onMedicationForAdhd : [false],
            emotionalProblems : [false],
            behaviorProblems : [false],
            heartDeseaseOrDefect : [false],
            headachesOrMigrations : [false],
            concussionOrHeadInjury : [false],
            eczemaOrPsoriasis : [false],
            eyeglasses : [false],
            sprainsOrFracturesOrDislocations : [false],
            majorSurgeryOrIllness : [false],
            heatStrokeOrExhaustion : [false],
            seizuresOrEpilepsy : [false],
            diabetesType1 : [false],
            diabetesType2 : [false],
            insulin : [false],
            hearingLoss : [false],
            visionLoss : [false],
            contagiousDisease : [false],
            otherSkinCondition : [""],
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
            this.KidHealth.get('additionalSpecifics').setValidators(Validators.required);
            this.KidHealth.get('additionalSpecifics').updateValueAndValidity();
        }else {
            this.showadditional = false;
            this.KidHealth.get('additionalSpecifics').clearValidators();
            this.KidHealth.get('additionalSpecifics').updateValueAndValidity();
        }
    }
    save() {
        if(this.KidHealth.valid) {
            this.dialogRef.close({participant: this.data.participantId, data: this.KidHealth.value});
        }else {
            //alert('heyyyy');
        }
    }
}
