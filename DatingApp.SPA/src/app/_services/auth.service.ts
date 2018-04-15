import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

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
        });
    }

    register (model: any) {
        return this.http.post(this.baseUrl + '/register', model, this.options);
    }
}
