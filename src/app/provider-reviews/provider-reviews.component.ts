import { Component, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../shared/services/api-request.service';

@Component({
  selector: 'app-provider-reviews',
  templateUrl: './provider-reviews.component.html',
  styleUrls: ['./provider-reviews.component.scss']
})
export class ProviderReviewsComponent implements OnInit {

  @Input() providerId: string;
  data:any = {};
  constructor(private apiRequest:ApiRequestService) { }

  ngOnInit(): void {
    if(this.providerId){
      this.loadReviews();
    }
  }

  loadReviews(){
    const payload = {
      page: 0,
      count:50,
      providerId: this.providerId
    }
      this.apiRequest.getAll('v2/web/testimonials',payload).subscribe(
        response =>{
          console.log(response.data);
          if(response && response.data){
            this.data = response.data;
          }

        }
      )
   
  }

}
