import { Observable } from 'rxjs/Observable';
import { AlertifyService } from './../_services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(): Observable<User[]> {
        return this.userService.getUsers().catch(error => {
            this.alertify.error('problem retriving data');
            this.router.navigate(['/home']);
            return Observable.of(null);
        });
    }
}
