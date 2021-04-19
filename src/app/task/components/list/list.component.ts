import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/shared/models/tarea.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
   tareas: Tarea[] = [];
   loading = false;
  constructor(private taskService: TaskService) {
    this.obtenerTareas();
   }

  ngOnInit(): void {
  }

  obtenerTareas() {
    this.loading = true;
    this.taskService.obtenerTareas().subscribe( 
      res => this.tareas = res,
       err => console.error(err),
       () => this.loading = false);
  }

  actualizarTarea(tarea: Tarea) {
    console.log(tarea);
    this.taskService.actualizarTarea({ ...tarea, done: !tarea.done })
    .subscribe( console.log)
  }

  borrarTarea(tarea: Tarea) {
    this.taskService.borrarTarea(tarea).subscribe( res => {
      this.obtenerTareas();
    });
  }
}