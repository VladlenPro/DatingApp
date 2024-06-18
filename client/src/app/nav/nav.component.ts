import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public model: any = {};

  constructor(public accountService: AccountService, 
              private router: Router, 
              private toastr: ToastrService
            ) { }

  public ngOnInit(): void {
  }

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
    });
  }

  public logout(): void {
    this.accountService.loguot();
    this.router.navigateByUrl('/');
  }

}
