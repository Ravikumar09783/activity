import { Injectable } from '@angular/core';
import { ApiRequestService } from '../shared/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apiRequest: ApiRequestService) { }

  loadSampleData(){
    return this.apiRequest.getAll('v1/countries',{});
  }

  loadDashboardData(providerId: string,locationId: string, bookingType, startDate){
    const payload: any = {
      providerId: providerId,
      locationId: locationId,
      offset: 330,
    }
    if(startDate) {
        payload.startDate = startDate;
    }
    if(bookingType && bookingType !== 'weekly'){
      payload.bookingType = bookingType;
    }
     return this.apiRequest.getAll(`v2/web/activitySessions`, payload);
  }
}
