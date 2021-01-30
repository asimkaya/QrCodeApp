import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getQrCode(text: string, size: string): Observable<Blob> {
    return this.http.get('http://api.qrserver.com/v1/create-qr-code/?data=' + text + '!&size=' + size, {
      responseType: 'blob',
    });
  }
}
