import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-input',
  templateUrl: './add-input.component.html',
  styleUrls: ['./add-input.component.scss']
})
export class AddInputComponent implements OnInit {
  @Output() addOk = new EventEmitter();
  forma: FormGroup;
  loading = false;
  constructor(private taskService: TaskService, private fb: FormBuilder, private snack: MatSnackBar) {
    this.forma  = this.fb.group({
      descripcion: ['']
    })
   }

  ngOnInit(): void {
  }

  get descripcion() {
    return this.forma.get('descripcion').value;
  }

  agregarTarea() {
    if(!this.descripcion) {
      return;
    }
    this.disableInput(true);
      this.taskService.crearTarea(this.descripcion).subscribe( res => {
        this.forma.get('descripcion').reset();
        this.addOk.emit();
        this.snack.open('Tarea  agregada!', 'cerrar', {duration: 3000})
        this.disableInput(false);
      },
      err => {this.snack.open('Ocurrió  un error al intentar agregar la tarea', 'cerrar', {duration: 3000})
      this.disableInput(false);
       });
    
  }

  disableInput(disable: boolean) {
    if(disable) {
      this.forma.get('descripcion').disable()
      this.loading = true
    } else {
      this.forma.get('descripcion').enable()
      this.loading = false;
    }
    
  }

}
