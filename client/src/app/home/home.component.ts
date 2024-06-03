import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public registerMode: boolean = false;
  public userRequstStirng: string = 'https://localhost:5001/users';
  users: any;

  constructor(private http: HttpClient) {}
  
  public ngOnInit(): void {
    this.getUsers();
  }

  public registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  public cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }

  private getUsers(): void {
    this.http.get(this.userRequstStirng).subscribe({
      next: (response: any) => this.users = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has been completed')
    });
  }

}
