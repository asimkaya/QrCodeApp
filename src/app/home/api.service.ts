import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getQrCode(text: string, size: string): Observable<Blob> {
    return this.http.get(environment.serverUrl + 'chart' + '?cht=qr' + '&chs=' + size + '&chl=' + text, {
      responseType: 'blob',
    });
  }
}
