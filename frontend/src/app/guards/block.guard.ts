import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const blockGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  const router: Router = inject(Router)

  if(!authService.currentUser$.getValue()) {
    return true
  } else {
    router.navigate(['/profile'])
    return false
  }
};
