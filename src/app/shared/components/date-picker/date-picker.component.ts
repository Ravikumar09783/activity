import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  @Input() placeholder: string;
  @Output("onDatechange") onDatechange: EventEmitter<any> = new EventEmitter();
  constructor() { 
     // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
     const currentYear = new Date().getFullYear();
     this.minDate = new Date(currentYear - 20, 0, 1);
     this.maxDate = new Date(currentYear + 1, 11, 31);
  }

    ngOnInit(): void {

    }
    handleDOBChange(event: MatDatepickerInputEvent<Date>) {
       this.onDatechange.emit(event.value);
    }
}
