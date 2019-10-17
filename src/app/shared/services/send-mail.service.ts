import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iinfo } from '../interfaces/info.interface';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  constructor(private http: HttpClient) { }

  sendEmail(obj): Observable<Iinfo> {
    return this.http.post<Iinfo>('http://localhost:3000/sendFormData', obj)
  }
}