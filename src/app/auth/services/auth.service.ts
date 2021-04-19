import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Login, Usuario } from 'src/app/shared/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlbase = `${environment.apis.myback.baseurl}`;
  username: string; 
  user$ = new Subject<string>();
  
  constructor(private http: HttpClient) { 
    this.username = '';
  }


  crearUsuario(usuario: Usuario) {
    const url = this.urlbase + environment.apis.myback.endpoints.usuarios;
    return this.http.post(url, usuario);
  }

  login(login: Login) {
    const url = this.urlbase + environment.apis.myback.endpoints.login;
    return this.http.post(url, login);
  }

  validarToken(token: string) {
    const url = this.urlbase + environment.apis.myback.endpoints.validar;
    return this.http.get(url, { headers: { 'x-token': token}})
    .pipe(tap( (res: any) => {
      
      this.username = res.ok ? res.usuario.nombre : '';
      this.user$.next(this.username);
    }),
          map( (res: any) => res?.ok),
          catchError( err  => of(false))
    );
  }

  logout()  {
    localStorage.removeItem('token');
    this.user$.next('');
    this.username = '';
  }

  
}
