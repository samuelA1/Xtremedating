import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public auth: AuthService, private alertify: AlertifyService, private router: Router) { }

  login () {
    this.auth.login(this.model).subscribe(data => {
      this.alertify.success('Logged in');
    }, error => {
      this.alertify.error('Failed to Login');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout () {
    this.auth.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

  loggedIn () {
    return this.auth.loggedIn();
  }

  ngOnInit() {
  }

}
