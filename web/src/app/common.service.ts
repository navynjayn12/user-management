import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiEndpoint = environment.APIEndpoint;

  constructor(private http: HttpClient) { }

  login(username, password) {

    let payload = { userName: username, password: password }

    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.apiEndpoint + "/api/login", payload, { headers: headers })
  }

  getUsers(data) {

    const { order = '', skip = 0, take = 2, sortBy = '' } = data

    return this.http
      .get(this.apiEndpoint + `/api/getAllData?
      filtername=${sortBy}
      &filterstatus=${order}
      &skip=${skip}
      &take=${take}`, data)
  }

  logout() {
    localStorage.clear();
  }
}
