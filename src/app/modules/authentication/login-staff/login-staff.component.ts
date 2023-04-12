import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountStaffService } from '../../../core/services/accountstaff.service';
import { ILoginAccountStaff } from 'src/app/models/IAccountStaff';

@Component({
  selector: 'app-login-organizer',
  templateUrl: './login-staff.component.html',
  styleUrls: ['./login-staff.component.css']
})
export class LoginStaffComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private AccountStaffService: AccountStaffService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginAccountStaff ()

  }

  async loginAccountStaff () {
    await this.AccountStaffService.loginAccountStaff(this.loginForm.value.code)
    .then(res => {
      console.log(res.token)
      localStorage.setItem('token', res.token)
      //localStorage.setItem('role', res.role)
      
      this.router.navigate(['/waiter']);

      /*
      if (localStorage.getItem('role') == "waiter") {
        this.router.navigate(['/waiter']);
      } else if (localStorage.getItem('role') == "kitchen"){
        this.router.navigate(['/kitchen']);
      } else {
        this.router.navigate(['']);
      }
      */ 
    })
      .catch(err => {
        this.displayErrorNotification(err.error.message)
      });
  }

  displayErrorNotification(msg: string): void {
    let eventErrorNotification = document.getElementById("login-error-notification");
    eventErrorNotification!.innerHTML = msg;
    eventErrorNotification!.style.display = "block";
  }
}
