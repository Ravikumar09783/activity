import { Injectable } from '@angular/core';
import {ApiRequestService} from "./api-request.service";

@Injectable({
    providedIn: 'root'
})
export class ActivityHubService {

    usertoken = 'Bearer '+this.getUserToken();
    //usertoken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVmMTk1MTJmNzk0NDU2MzA2Y2JlMmM0YyIsImRldmljZVR5cGUiOiJ3ZWJXb3JkcHJlc3MiLCJ0eXBlIjoidXNlciIsInRpbWUiOjE1OTU0OTQ3MDQ0ODgsImlhdCI6MTU5NTQ5NDcwNH0.34t4fqdkSC5adQXs9EtXnMCPbzeTwLSW2TnkGJCAkdw';
    
    constructor(private apiRequest: ApiRequestService) { }
    
    getUserToken() {
        let storage = localStorage.getItem('activityhub_user');
        if(storage) {
            let userData = JSON.parse(localStorage.getItem('activityhub_user'));

            if(userData) {
                return userData.accessToken;
            }
        }
    }
    checkStoreCredit(providerId) {
        
        return this.apiRequest.getAll(`v2/wp/userProviderCreditSummary/${providerId}`);
    }
    getSessionDetail(sessionId, providerId) {
        return this.apiRequest.getAll(`v2/web/activitySessions/${providerId}/${sessionId}`, {offset: 350});
    }
    
    getUserKids() {
        const headers = { 'Authorization': this.usertoken}
        return this.apiRequest.get(`v2/web/kids`, {headers});
    }
    
    /**
     * login with activity hub API
     * 
     * @param object @data i.e {email: test@gmail.com, password: 123456} 
     */
    login(dataArray) {
        return this.apiRequest.post(`v2/web/auth/email/login`, dataArray);
    }
    
    /**
     * get participant detail from user profile
     * 
     * @param String particpantId
     */
    participantDetail(particpantId) {
        const headers = { 'Authorization': this.usertoken}
        return this.apiRequest.get(`v2/web/kids/${particpantId}`, {headers});
    }
    
    /**
     * get provider terms and coditions
     * @param String providerId
     */
    getProviderterms(providerId) {
        return this.apiRequest.get(`v2/web/activityProviderTerms?providerId=${providerId}`);
    }
    
    /**
     * calculate cart amount
     * 
     * @param Object bookingDetail
     */
    doPriceCalculation(bookingDetail) {
        return this.apiRequest.post(`v2/web/activityRegistrations/calculateamount`, bookingDetail);
    }
    
    /**
     * purchase session
     */
    purchaseSession(bookingDetail) {
        return this.apiRequest.post(`v2/web/guest/activityRegistrations`, bookingDetail);
    }
    
    /**
     * place Order
     * 
     * @param Object bookingDetail
     */
    placeOrder(bookingDetail) {
        if(this.getUserToken()) {
            /* Api Call for logged in user */
            return this.apiRequest.post(`v2/web/activityRegistrations`, bookingDetail);
        }else {
            /* API call for guest user */
            return this.apiRequest.post(`v2/web/guest/activityRegistrations`, bookingDetail);
        }
    }
}
