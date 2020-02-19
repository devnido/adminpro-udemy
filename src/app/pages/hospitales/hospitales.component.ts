import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  hospitales: Hospital[] = [];


  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.modalUploadService.notificacion.subscribe(loqurecibo => this.cargarHospitales());

  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        console.log(hospitales);

        this.hospitales = hospitales;
      });


  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();

      return;
    }


    // this.cargando = true;

    this.hospitalService.buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
        // this.cargando = false;

      });

  }

  mostrarModal(id: string) {

  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire(
          'Hospital Actualizado!',
          'El hospital ' + hospital.nombre + ' se ha actualizado exitosamente.',
          'success'
        );
      }

      );

  }

  borrarHospital(hospital: Hospital) {
    console.log(hospital);



    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this.hospitalService.borrarHospital(hospital._id)
          .subscribe((resp: any) => {
            console.log(resp);

            this.cargarHospitales();

            Swal.fire(
              'Eliminado!',
              'El hospital se ha eliminado exitosamente.',
              'success'
            );

          });


      }
    });

  }

  crearHospital() {

    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputAttributes: {
        placeholder: 'Ingrese el nombre del hospital',
        autocapitalize: 'off',
        name: 'wea'
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value || value.length === 0) {
          return;
        }

        this.hospitalService.crearHospital(value)
          .subscribe(hospital => {
            return hospital;

          });

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {


      console.log(result);

      if (result.value) {
        Swal.fire('Hospital agregado', 'El hospital se ha agregado exitosamente', 'success');
        this.cargarHospitales();
      }
    });

  }

  actualizarImagen(hospital: Hospital) {

    this.modalUploadService.mostrarModal('hospitales', hospital._id);

  }

}
