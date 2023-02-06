import { Component, OnInit } from '@angular/core';
import { SignInRegisterComponent } from '../../sign-in-register/sign-in-register.component';
import {MatDialog} from '@angular/material/dialog';
import { ActivityHomeComponent } from '../activity-home.component';

@Component({
  selector: 'app-activity-register',
  templateUrl: './activity-register.component.html',
  styleUrls: ['./activity-register.component.css']
})
export class ActivityRegisterComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  
  ) { }

  ngOnInit(): void {
  }


  openDialogRegisterSignIn() {
    const dialogRef = this.dialog.open(SignInRegisterComponent);

    // this.activityHomeComponent.closeDialog()

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


