import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';


@Injectable({
    providedIn: 'root'
})
export class MedicoService {

    totalMedicos: number = 0;

    constructor(public http: HttpClient, public usuarioService: UsuarioService) { }


    buscarMedicos(termino: string) {

        const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.medicos;
            })
        );

    }

    cargarMedicos() {
        const url = URL_SERVICIOS + '/medico';

        return this.http.get(url)
            .pipe(
                map((resp: any) => {
                    console.log(resp);

                    this.totalMedicos = resp.total;
                    return resp.medicos;
                })
            );
    }

    cargarMedico(id: string) {
        const url = URL_SERVICIOS + '/medico/' + id;

        return this.http.get(url)
            .pipe(
                map((resp: any) => {
                    console.log(resp);

                    return resp.medico;
                })
            );
    }

    borrarMedico(id: string) {
        const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.usuarioService.token;

        return this.http.delete(url)
            .pipe(map(resp => {
                return resp;
            }));
    }


    guardarMedico(medico: Medico) {

        if (medico._id) {
            // actualizando

            const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.usuarioService.token;
            return this.http.put(url, medico)
                .pipe(
                    map((resp: any) => {
                        return resp.medico;
                    })
                );


        } else {
            // creando
            const url = URL_SERVICIOS + '/medico?token=' + this.usuarioService.token;
            return this.http.post(url, medico)
                .pipe(
                    map((resp: any) => {
                        return resp.medico;
                    })
                );
        }



    }


}
