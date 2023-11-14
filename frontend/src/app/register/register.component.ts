import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup
  isSubmitted: boolean = false

  // Feedback Messages
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  getControl(name: string): AbstractControl | null {
    return this.registerForm.get(name)
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/login'])
      },
      err => {
        console.log(err)
        this.errorMessage = err.error
      }
    )
  }

}
