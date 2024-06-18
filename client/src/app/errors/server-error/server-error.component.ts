import { Component } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {
  public error: any;
  

  constructor(private router: Router) {
    const navigation: Navigation | null = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

}
