import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountOrganizerService } from '../../../core/services/accountorganizer.service';
import { ILoginAccountOrganizer } from 'src/app/models/IAccountOrganizer';

@Component({
  selector: 'app-login-organizer',
  templateUrl: './login-organizer.component.html',
  styleUrls: ['./login-organizer.component.css']
})
export class LoginOrganizerComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private AccountOrganizerService: AccountOrganizerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginAccountOrganizer()

  }

  async loginAccountOrganizer() {
  await this.AccountOrganizerService.loginAccountOrganizer(this.loginForm.value.email, this.loginForm.value.password)
  .then(res => {

    localStorage.setItem('token', res.token)
    
    this.router.navigate(['/organizer']);
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
