import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcessToken } from '../models/AuthModels';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }


  login(value: any):Observable<AcessToken> {
  return this.http.post<AcessToken>('api/public/auth/login',value)
  }

  sigin(value: any) {
    return this.http.post<AcessToken>('api/public/auth/register',value)
  }
}
