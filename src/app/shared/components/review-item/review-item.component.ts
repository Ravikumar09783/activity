import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {

  @Input() reviewItem: any;

  constructor() {
    
   }

  ngOnInit(): void {
    if(this.reviewItem && this.reviewItem.createdAt){
      this.reviewItem.createdAt =  moment(this.reviewItem.createdAt).fromNow(); 
     }
  }

}
