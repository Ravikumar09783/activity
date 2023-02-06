import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivityHubService } from '../../services/activity-hub.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    User = new Subject();
    User$ = this.User.asObservable();
    
    constructor(private activityhub: ActivityHubService) { 
        
    }
    
    /**
     * login method
     * 
     * @param string email : user email address
     * @param string password: user password string
     */
    login(email, password) {
        return this.activityhub.login({'email' : email, 'password' : password});
    }
    
    logout() {
        localStorage.removeItem('activityhub_user');
    }
    /**
     * set logged in user token
     * @param object data
     */
    setUser(data) {
        localStorage.setItem('activityhub_user', JSON.stringify(data));
    }
    
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('activityhub_user'));
    }
}
