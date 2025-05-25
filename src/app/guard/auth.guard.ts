import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const plataformaId = inject(PLATFORM_ID)

  if(isPlatformBrowser(plataformaId)){
    const token = localStorage.getItem('token')
    if(!token){
      router.navigate(['/login'])
      return false
    }
  }
  
  return true;
};
