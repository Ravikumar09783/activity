import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/services/api-request.service';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent implements OnInit {

  constructor(
    private apiRequestService:ApiRequestService
  ) { }

  id= localStorage.getItem("sessionId")
  activityInfo:any;

  ngOnInit(): void {
    this.apiRequestService.getActivityinfo("activitySessions",this.apiRequestService.activityId).subscribe(res=>{
      this.activityInfo= res.data
      console.log("#############", this.activityInfo)
    })
  }

}
