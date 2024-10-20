import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = localStorage.getItem('userId');

  if (userId != null) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
