import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tarea } from 'src/app/shared/models/tarea.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlbase = `${environment.apis.myback.baseurl}`;
  constructor(private http: HttpClient) { }

  crearTarea(descripcion: string) {
    const url = this.urlbase + environment.apis.myback.endpoints.crearTarea;
    return this.http.post(url, {descripcion});
  }

  obtenerTareas() {
    const url = this.urlbase + environment.apis.myback.endpoints.obtenerTareas;
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      if(resp.ok) {
        return resp.tareas as Tarea[]
      } else {
        throw 'Ocurrio un error al obtener las tareas';
      }
    }) );
  }

  actualizarTarea(tarea: Tarea)  {
    const url = this.urlbase + environment.apis.myback.endpoints.obtenerTareas;
    return this.http.put(url, tarea);
  }

  borrarTarea(tarea: Tarea) {
    const url = this.urlbase + environment.apis.myback.endpoints.obtenerTareas + '/' + tarea.id;
    return this.http.delete(url);
  }

}
