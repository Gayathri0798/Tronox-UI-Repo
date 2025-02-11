import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Ensures that the service is available throughout the app
})
export class ApiService {
  constructor(private http: HttpClient) {}

  runTestApi() {
    return this.http.get('http://localhost:3000/run-test');
  }
}
