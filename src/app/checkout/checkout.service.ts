import { Injectable } from '@angular/core';
import { ApiRequestService } from '../shared/services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
    constructor(private apiRequest: ApiRequestService) { 
		
    }
}
