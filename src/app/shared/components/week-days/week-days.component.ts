import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-days',
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.css']
})
export class WeekDaysComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  weekDaysData= [
    ["SU","Sunday"],
    ["M","Monday"],
    ["T","Tuesday"],
    ["W","Wednesday"],
    ["TH","Thursday"],
    ["F","Friday"],
    ["SA","Saturday"],
  ]

}
