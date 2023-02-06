import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef} from '@angular/material/dialog';

import { AuthService } from "./auth.service";
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
    form: FormGroup;
    loginmessage:string;
    public loginInvalid: boolean;
    private formSubmitAttempt: boolean;
    private returnUrl: string;
    
    constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private dialogRef: MatDialogRef<LoginRegisterComponent>) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.email],
            password: ['', Validators.required]
        });
    }
    
    async onSubmit() {
        this.loginInvalid = false;
        this.formSubmitAttempt = false;
        if (this.form.valid) {
            const username = this.form.get('username').value;
            const password = this.form.get('password').value;
            this.authService.login(username, password).subscribe(
            (response:any) =>{
                if(response.statusCode == 201) {
                    this.authService.setUser(response.data);
                    this.dialogRef.close();
                }else {
                    this.loginInvalid = true;
                    this.loginmessage = response.message;
                }
            },
            err => {
                this.loginInvalid = true;
                this.loginmessage = err.error.message;
            });
        } else {
            this.formSubmitAttempt = true;
        }
    }
    
    /**
     * login with social
     * 
     * @param string vendor i.e facebook or google
     */
    socialSignIn(vendor) {
        
    }
}
