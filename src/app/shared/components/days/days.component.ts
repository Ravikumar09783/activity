import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../constants';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {
  @Input() selectedDays = [];
  days = Constants.days;
  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedDays, "selectedDays");
  }

}
