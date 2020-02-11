import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {


  public tipo: string;
  public id: string;

  public displayModal: boolean = false;

  public notificacion = new EventEmitter<any>();

  constructor() {

    console.log('modal upload listo');

  }

  ocultarModal() {
    this.displayModal = false;
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.displayModal = true;

    this.id = id;
    this.tipo = tipo;
  }
}
