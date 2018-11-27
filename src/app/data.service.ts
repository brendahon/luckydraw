import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { User } from './draw/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri = window.location.protocol + "//" + window.location.host + "/api/v1/users";

  constructor(private http: HttpClient) { }

  getRandomUser() {
    return this.http.get(`${this.uri}/draw`);
  }
}
