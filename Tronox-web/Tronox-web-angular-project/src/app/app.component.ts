import { Component, inject } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  runTest() {
    this.http.get('http://localhost:3000/run-test').subscribe(
      (response) => {
        console.log('Test run successfully', response);
      },
      (error) => {
        console.error('Error running test', error);
      }
    );
  }
}
