import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GET_TILES, UPLOAD_EXCEL } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  constructor(private http: HttpClient) {}

  getTiles(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(GET_TILES, { headers });
  }

  uploadExcelToServer(file: File): Observable<any> {
    const headers = this.setHeaders();
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(UPLOAD_EXCEL, formData, { headers, responseType: 'text' })
      .pipe(
        map((response: any) => {
          try {
            return JSON.parse(response); // Try parsing JSON if possible
          } catch (error) {
            return response; // Return as text if it's not valid JSON
          }
        })
      );
  }

  setHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
