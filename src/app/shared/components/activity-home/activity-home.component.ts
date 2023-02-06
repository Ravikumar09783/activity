import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { ActivityRegisterComponent } from './activity-register/activity-register.component';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrls: ['./activity-home.component.css'],
})
export class ActivityHomeComponent implements OnInit {
  constructor(
    private apiRequestService: ApiRequestService,
    public dialog: MatDialog
  ) {}

  activityDetials: any;
  positionOptions = 'above';
  position = new FormControl(this.positionOptions[0]);

  weekDaysData = [
    ['SU', 'Sunday'],
    ['M', 'Monday'],
    ['T', 'Tuesday'],
    ['W', 'Wednesday'],
    ['TH', 'Thursday'],
    ['F', 'Friday'],
    ['SA', 'Saturday'],
  ];

  ngOnInit(): void {
    this.apiRequestService.getActivity('activitySessions').subscribe((res) => {
      this.activityDetials = res;
      this.dateChange();
      // console.log("$$$$$$$$$$", this.activityDetials)
    });
  }

  openDialog(id: any) {
    // console.log("000000000",id)
    this.apiRequestService.activityId = id;
    const dialogRef = this.dialog.open(ActivityInfoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }
   arrayName2 = [];
  dateChange() {
    var a = this.activityDetials;
    // console.log("ABC",a.data.sessions[1].sessions)

    var arrayName = [];
    var arrayName1 = [];
   

    a.data.sessions.map((data) => {
      arrayName.push(data);
    });

    arrayName.map((data) => {
      arrayName1.push(data.sessions);
    });
    arrayName1.map((data) => {
      data.map((res) => {
        this.arrayName2.push([
         new Date(res.localDateTimestamp.from).toString(),
         new Date( res.localDateTimestamp.to).toString(),
        ]);
      });
    });

    console.log('0000000000000', this.arrayName2);
   
  }

  openDialogBox() {
    const dialogRef = this.dialog.open(ActivityRegisterComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
