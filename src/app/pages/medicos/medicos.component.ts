import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  buscarMedicos(termino: string) {


    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }


    this.medicoService.buscarMedicos(termino)
      .subscribe((medicos: any) => this.medicos = medicos);

  }

  cargarMedicos() {
    this.medicoService.cargarMedicos()
      .subscribe((medicos: any) => this.medicos = medicos);
  }

  crearMedico() {

  }

  editarMedico(medico: Medico) {

  }

  borrarMedico(medico: Medico) {

    this.medicoService.borrarMedico(medico._id)
      .subscribe((resp) => {
        Swal.fire('Medico Eliminado', 'El medico se ha eliminado correctamente', 'success');
        this.cargarMedicos();
      });


  }

}
