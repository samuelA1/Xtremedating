import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  login () {
    this.authService.login(this.model).subscribe(data => {
      console.log('Logged in');
    }, error => {
      console.log('failed to login');
    });
  }

  logout () {
    this.authService.userToken = null;
    localStorage.removeItem('token');
  }

  loggedIn () {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ngOnInit() {
  }

}
