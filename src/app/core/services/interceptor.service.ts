import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    const token = localStorage.getItem('token') || '';

    if(!token)  {
      return next.handle(req);
    }

    const authReq = req.clone({ setHeaders: { 'x-token': token}});
    return next.handle(authReq);


  }
}
