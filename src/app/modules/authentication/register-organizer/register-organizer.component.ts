import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountOrganizerService } from '../../../core/services/accountorganizer.service';
import { ICreateAccountOrganizer } from 'src/app/models/IAccountOrganizer';


@Component({
  selector: 'app-register-organizer',
  templateUrl: './register-organizer.component.html',
  styleUrls: ['./register-organizer.component.css']
})
export class RegisterOrganizerComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private AccountOrganizerService: AccountOrganizerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.createAccountOrganizer()

  }

  async createAccountOrganizer() {
    await this.AccountOrganizerService.postAccountOrganizer(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password)
    .then(res => { 
      this.router.navigate(['/auth/login/organizer']);
    })
    .catch(err => {
      this.displayErrorNotification(err.error.message)
    });    
  }

  displayErrorNotification(msg: string): void {
    let eventErrorNotification = document.getElementById("event-error-notification");
    eventErrorNotification!.innerHTML = msg;
    eventErrorNotification!.style.display = "block";
  }

}

