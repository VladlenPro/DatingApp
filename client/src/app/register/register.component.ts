import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>()

  model: any = {};

  constructor(private accountService: AccountService) {}

  public register(): void  {
   this.accountService.register(this.model).subscribe({
    next: ()=> {
      this.cancel();
    },
    error: (error:any) => console.log(error)
   })
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
