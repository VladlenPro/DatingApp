import { Inject, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService: AccountService = inject(AccountService);
  const toastr: ToastrService = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user =>{
      if(user) return true
      toastr.error('you shall not pass');
      return false;
    })
  )
};
