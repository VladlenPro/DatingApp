import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'Dating app';
  public users: any;
  public userRequstStirng: string = 'https://localhost:5001/users';

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.http.get(this.userRequstStirng).subscribe({
      next: (response: any) => this.users = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has been completed')
    });
  }
  

}


