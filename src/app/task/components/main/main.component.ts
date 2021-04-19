import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('appLista') appLista: ListComponent;
  constructor() { }

  ngOnInit(): void {
  }

  actualizarLista(){
    this.appLista.obtenerTareas();
  }

}
