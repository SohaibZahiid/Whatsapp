import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup

  // Feedback Messages
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  getControl(name: string): AbstractControl | null {
    return this.loginForm.get(name)
  }

  onSubmit(){
    if(this.loginForm.valid) {
      const user: User = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login(user).subscribe(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(res))
          this.authService.currentUser$.next(res.user)
          this.errorMessage = ''
          this.router.navigate(['/profile'])
        },
        err => {
          this.errorMessage = err.error
        }
      )
    }
    }

}
