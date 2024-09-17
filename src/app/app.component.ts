import { Component, inject, OnInit } from '@angular/core';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'listaTareasApp';

  listaTareas: string[] = [];
  nuevaTarea: string = '';
  tareasPaginadas: string[] = [];

  pageSize: number = 5;
  pageNumber: number = 1;
  totalPages: number = 1;

  private _tareasService = inject(TareasService);

  ngOnInit(): void {
    this.actualizarListaTareas();
  }
  actualizarListaTareas(): void {
    this.listaTareas = this._tareasService.getTareas();
    this.totalPages = Math.ceil(this.listaTareas.length / this.pageSize);
    this.mostrarTareasPaginadas();
  }
  mostrarTareasPaginadas(): void {
    const start = (this.pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.tareasPaginadas = this.listaTareas.slice(start, end);
  }

  agregarTarea(){
    if (this.nuevaTarea.trim()) {
      this._tareasService.agregarTareas(this.nuevaTarea);
      this.nuevaTarea = '';
      this.actualizarListaTareas();
  }
}
  eliminarTarea(index: number): void{
    const tareaIndex = (this.pageNumber - 1) * this.pageSize + index;
    this._tareasService.eliminarTareas(tareaIndex);
    this.actualizarListaTareas();
    if (this.tareasPaginadas.length === 0 && this.pageNumber > 1) {
      this.pageNumber--;
      this.mostrarTareasPaginadas();
    }
  }
  nextPage(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.mostrarTareasPaginadas();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.mostrarTareasPaginadas();
    }
  }
}
