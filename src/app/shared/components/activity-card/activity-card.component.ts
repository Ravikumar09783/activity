import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/* popup components */
import { SessionDetailComponent } from "../session-detail/session-detail.component";
import { AddToCartComponent } from "../add-to-cart/add-to-cart.component";
import { LoginRegisterComponent } from "../login-register/login-register.component";
import * as moment from 'moment';


/* popup components */
@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {
  @Input() item: any;
    isLoggedin:any;
    sessionDates: any = {};
    sessionImage: any = {};

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
        this.isLoggedin = true;
        if(this.item && this.item.dateTimestamp){
          this.sessionDates.from = moment(this.item.dateTimestamp.from).format('MMM D');
          this.sessionDates.to = moment(this.item.dateTimestamp.to).format('MMM D YYYY');
          this.sessionDates.startTime = moment(this.item.dateTimestamp.from).format('h:mm a');
          this.sessionDates.endTime = moment(this.item.dateTimestamp.to).format('h:mm a');
          console.log(this.sessionDates, "sessiondates");


        }
       this.sessionImage = this.item.sessionImage ? this.item.sessionImage :
        (this.item.activityId && this.item.activityId.photosURL &&  this.item.activityId.photosURL.length ? 
          this.item.activityId.photosURL[0] : {});
    }
  
    purchaseSession(sessionId) {
        /* if user is not loggied in */
        if(!this.isLoggedin) {
            const dialogRef = this.dialog.open(LoginRegisterComponent, {data: {sessionId: sessionId}});

            dialogRef.afterClosed().subscribe(result => {
              // console.log(`Dialog result: ${result}`);
            });
        }else {
            const dialogRef = this.dialog.open(AddToCartComponent, {data: {sessionId: sessionId}, panelClass: 'add-to-cart-modal'});

            dialogRef.afterClosed().subscribe(result => {
            //  console.log(`Dialog result: ${result}`);
            });
        }
        
    }
    
    sessionDetail(sessionId) {
        const dialogRef = this.dialog.open(SessionDetailComponent, {data: {sessionId: sessionId}});

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    }
}
