import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_TILES } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  constructor(private http: HttpClient) {}

  getTiles(): Observable<any> {
    return this.http.get<any>(GET_TILES);
  }
}
