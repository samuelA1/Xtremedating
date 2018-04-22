import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public auth: AuthService, private alertify: AlertifyService) { }

  login () {
    this.auth.login(this.model).subscribe(data => {
      this.alertify.success('Logged in');
    }, error => {
      this.alertify.error(error);
    });
  }

  logout () {
    this.auth.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }

  loggedIn () {
    return this.auth.loggedIn();
  }

  ngOnInit() {
  }

}
