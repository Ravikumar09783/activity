import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
   @Input() data: any = {};
  constructor() { }

  ngOnInit(): void {
    //console.log(this.data, "here i am ");
  }

}
