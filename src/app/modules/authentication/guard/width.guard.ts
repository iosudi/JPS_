import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const widthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const windowWidth = window.innerWidth;

  if (windowWidth <= 775) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
