import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>()

  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  public register(): void  {
   this.accountService.register(this.model).subscribe({
    next: ()=> {
      this.cancel();
    },
    error: (error:any) => this.toastr.error(error.error)
   })
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
