import { Component, OnInit, HostListener } from '@angular/core';
import {HomeService} from './home.service';
import {Constants} from '../shared/constants';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isStickyTabs: boolean = false;
    @HostListener('window:scroll', ['$event']) onScrollEvent($event){
        this.isStickyTabs = window.pageYOffset >= 250;
    }
  constructor(private homeService: HomeService, private route: ActivatedRoute) { }
  tabOptions = [];
  providerId: string;
  locationId: string;
  sessionDate: string;
  isProcessing = false;
  bookingTypeId: string = 'weekly'
  providerLocDetails: any = {};
  data: any;
  heartIcon  =  '../../../../assets/images/icons/heart.png';
  bookingTypes:[] = Constants.bookingType;



  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if(params.providerId && params.locationId){
          this.providerId = params.providerId;
          this.locationId = params.locationId;
          this.loadData();
        }
      });
  }
  
  changeBookingDate(sessionDate) {
      let d = new Date(sessionDate);
      this.sessionDate = [`${d.getFullYear()}`, `0${d.getMonth()}`.substr(-2), `0${d.getDate()}`.substr(-2)].join("-");
      this.loadData();
  }
  
  changeBookingType($event){
    this.bookingTypeId = $event.value;
    console.log(this.bookingTypeId, $event);
    this.loadData();
  }

  loadData(){
      this.isProcessing = true;
    this.homeService.loadDashboardData(this.providerId, this.locationId, this.bookingTypeId, this.sessionDate).subscribe(
      response =>{
          this.isProcessing = false;
           if(response && response.data){
              var res = response.data;
              if(res){
                if(res.location){
                  this.providerLocDetails = res.location
                }
                if(res.sessions){
                  if(_.isEmpty(res.sessions)){
                    this.tabOptions = [];
                    this.data = {}
                  }
                  for(let key in res.sessions){
                      if(!this.tabOptions.includes(key)) {
                        this.tabOptions.push(key);
                      }
                    this.data = res.sessions;
                  }
                }
              }
              
           }
           console.log(this.tabOptions, "taboptions");
      },
      error =>{

      }
    )

  }

}
