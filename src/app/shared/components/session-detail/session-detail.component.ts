import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivityHubService } from '../../services/activity-hub.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {
    providerId:any;
    locationId:any;
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private activityhub: ActivityHubService, private route: ActivatedRoute) { }
    sessionDetail:any;
    ngOnInit(): void {
        /* query parameters */
        this.route.queryParams
        .subscribe(params => {
            if(params.providerId && params.locationId){
                this.providerId = params.providerId;
                this.locationId = params.locationId;
            }
        });
        
        this.activityhub.getSessionDetail(this.data.sessionId, this.providerId).subscribe(
            (response:any) =>{
                if(response.statusCode == 200) {
                    this.sessionDetail = response.data;
                }
            });
    }

}
