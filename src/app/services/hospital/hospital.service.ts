import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  totalHospitales: number = 0;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';

    url += '?token=' + this.usuarioService.token;

    return this.http.post(url, { nombre })
      .pipe(
        map((resp: any) => {

          return resp.hospital;
        })
      );

  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/hospital/' + termino;

    url += '?token=' + this.usuarioService.token;

    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          return resp.hospital;
        })
      );

  }


  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          console.log(resp);

          this.totalHospitales = resp.total;
          return resp.hospitales;
        })
      );

  }


  obtenerHospital(id: any) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          return resp.hospital;
        })
      );
  }

  borrarHospital(id: any) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }


  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;

    url += '?token=' + this.usuarioService.token;

    return this.http.put(url, { hospital })
      .pipe(
        map((resp: any) => {
          console.log(resp);

          return resp.hospital;
        })
      );

  }



}
