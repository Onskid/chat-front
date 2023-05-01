import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcessToken } from '../models/AuthModels';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {



      let tokenString = localStorage.getItem("session")

      if(tokenString ==null){
        return next.handle(request);

      }else{


        let token  = JSON.parse(tokenString) as AcessToken;

        if (token!= null && token.token != null && token.token.length>0){
          const tokenREq = request.clone({
            headers: request.headers.set('Authorization',token.token)
          });

          return next.handle(tokenREq);

        }else{
          return next.handle(request);

        }
      }






  }
}
