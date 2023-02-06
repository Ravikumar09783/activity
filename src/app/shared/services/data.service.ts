import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
    
    constructor(private apiRequest: ApiRequestService) { 

    }
    
    getGenders() {
        return [{
                value: 'male',
                label: 'Male'
            },
            {
                value: 'female',
                label: 'Female'
            },
            {
                value: 'other',
                label: 'Rather Not Say'
            }
        ];
    }
    
    extendedCares = {
        'earlyCare' : 'Early Drop',
        'afterCare' : 'Late Pickup',
        'combined' : 'Early Drop + Late Pickup'
    };
    getMaritialStatus() {
        return [{
                value: 'single',
                label: 'Single'
            },
            {
                value: 'married',
                label: 'Married'
            }
        ];
    }
    
    getMonths() {
        return {
            '01' : 'Jan',
            '02' : 'Feb',
            '03' : 'Mar',
            '04' : 'Apr',
            '05' : 'May',
            '06' : 'Jun',
            '07' : 'Jul',
            '08' : 'Aug',
            '09' : 'Sep',
            '10' : 'Oct',
            '11' : 'Nov',
            '12' : 'Dec',
        };
    }
    getYearRange(start?: number, end?: number) {
        if(start == undefined) {
             start = new Date().getFullYear();
        }
        if(!end) {
            var end = start + 30;
        }

        let input = [];
        for (var i=start; i<end; i++) {
            input.push(i);
        }
        return input;
    }
    getCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('activity_cart_items'));
        if(cartItems) {
            return cartItems;
        }else {
            return {};
        }
    }
    getStates() {
        return {
            "AL" : "Alabama",
            "AK" : "Alaska",
            "AZ" : "Arizona",
            "AR" : "Arkansas",
            "CA" : "California",
            "CO" : "Colorado",
            "CT" : "Connecticut",
            "DE" : "Delaware",
            "DC" : "District Of Columbia",
            "FL" : "Florida",
            "GA" : "Georgia",
            "HI" : "Hawaii",
            "ID" : "Idaho",
            "IL" : "Illinois",
            "IN" : "Indiana",
            "IA" : "Iowa",
            "KS" : "Kansas",
            "KY" : "Kentucky",
            "LA" : "Louisiana",
            "ME" : "Maine",
            "MD" : "Maryland",
            "MA" : "Massachusetts",
            "MI" : "Michigan",
            "MN" : "Minnesota",
            "MS" : "Mississippi",
            "MO" : "Missouri",
            "MT" : "Montana",
            "NE" : "Nebraska",
            "NV" : "Nevada",
            "NH" : "New Hampshire",
            "NJ" : "New Jersey",
            "NM" : "New Mexico",
            "NY" : "New York",
            "NC" : "North Carolina",
            "ND" : "North Dakota",
            "OH" : "Ohio",
            "OK" : "Oklahoma",
            "OR" : "Oregon",
            "PA" : "Pennsylvania",
            "RI" : "Rhode Island",
            "SC" : "South Carolina",
            "SD" : "South Dakota",
            "TN" : "Tennessee",
            "TX" : "Texas",
            "UT" : "Utah",
            "VT" : "Vermont",
            "VA" : "Virginia",
            "WA" : "Washington",
            "WV" : "West Virginia",
            "WI" : "Wisconsin",
            "WY" : "Wyoming"
        };
    }

}
