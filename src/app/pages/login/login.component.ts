import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcessToken } from 'src/app/models/AuthModels';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


   error="";


  loginFormGroup: FormGroup ;
  userNameFormControl: FormControl ;
  passwordFormControl: FormControl ;

  constructor(private authService: AuthService){
    this.userNameFormControl= new FormControl('',Validators.required)
    this.passwordFormControl= new FormControl('',Validators.required)
    this.loginFormGroup =new FormGroup({
      "userName": this.userNameFormControl,
      "password": this.passwordFormControl
    });
  }


  login() {

    this.authService.login(this.loginFormGroup.value).subscribe({
      next: (v:AcessToken) => localStorage.setItem("session",JSON.stringify(v)),
      error: (e) => this.error = e.error,
      complete: () => console.info('complete')
    }
    )
    }

    signin() {
      this.authService.sigin(this.loginFormGroup.value).subscribe({
        next: (v:AcessToken) => localStorage.setItem("session",JSON.stringify(v)),
        error: (e) => this.error = e.error,
        complete: () => console.info('complete')
      }
      )
      }

}
