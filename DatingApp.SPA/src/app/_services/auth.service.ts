import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
baseUrl = 'http://localhost:5000/api/auth';
userToken: any;
headers = new Headers({'Content-type': 'application/json'});
options = new RequestOptions({headers: this.headers});

constructor(private http: Http) { }

    login (model: any) {
        return this.http.post(this.baseUrl + '/login', model, this.options).map((response: Response) => {
            const user = response.json();
            if (user) {
                localStorage.setItem('token', user.tokenString);
                this.userToken = user.tokenString;
            }
        }).catch(this.handleErrors);
    }

    register (model: any) {
        return this.http.post(this.baseUrl + '/register', model, this.options).catch(this.handleErrors);
    }

    private handleErrors (error: any) {
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
            return Observable.throw(applicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(modelStateErrors || 'Server error');
    }
}
