import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMin } from '../models/AuthModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getAllUsers():Observable<Array<UserMin> >{
  return this.http.get<Array<UserMin> >('api/users')
  }


}
