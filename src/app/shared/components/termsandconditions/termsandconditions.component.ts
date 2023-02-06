import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ActivityHubService } from '../../services/activity-hub.service';
@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TermsandconditionsComponent>, private activityhub: ActivityHubService) { }
    termsAndConditions:any;
    ngOnInit(): void {
        this.activityhub.getProviderterms(this.data.providerId).subscribe(
            (response:any) =>{
                if(response.statusCode === 200) {
                    this.termsAndConditions = response.data;
                }
            },
            (err:any) =>{
                console.log(err);
            }
        );
    }

}
