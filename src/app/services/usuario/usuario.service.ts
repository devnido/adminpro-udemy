import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;
    menu: any[] = [];

    constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {

        this.cargarStorage();
    }

    crearUsuario(usuario: Usuario) {

        const url = URL_SERVICIOS + '/usuario';

        return this.http.post(url, usuario)
            .pipe(
                map((resp: any) => {

                    Swal.fire('Usuario creado', usuario.email, 'success');

                    return resp.usuario;
                }),
                catchError(err => {
                    console.log('Errorsss: ', err.error.mensaje);
                    Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
                    return throwError(err.message);
                })
            );
    }

    actualizarUsuario(usuario: Usuario) {
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        console.log(url);

        url += '?token=' + this.token;

        console.log(url);


        return this.http.put(url, usuario)
            .pipe(
                map((resp: any) => {

                    if (usuario._id === this.usuario._id) {
                        this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
                    }


                    return true;
                }),
                catchError(err => {
                    console.log('Errorsss: ', err.error.mensaje);
                    Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
                    return throwError(err.message);
                })
            );

    }

    estaLogueado() {
        return (this.token.length > 5) ? true : false;
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }

    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;

    }

    logout() {
        this.usuario = null;
        this.token = '';
        this.menu = [];

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);


    }

    loginGoogle(token: string) {
        const url = URL_SERVICIOS + '/login/google';

        return this.http.post(url, { token })
            .pipe(
                map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu); console.log(resp);
                    return true;
                })
            );


    }

    login(usuario: Usuario, recordar: boolean = false) {
        const url = URL_SERVICIOS + '/login';

        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }


        return this.http.post(url, usuario)
            .pipe(
                map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu); console.log(resp);
                    return true;
                }),
                catchError(err => {
                    console.log('Errorsss: ', err.error.mensaje);
                    Swal.fire('Error en el login', err.error.mensaje, 'error');
                    return throwError(err.message);
                })

            );

    }

    cambiarImagen(file: File, id: string) {

        return this.subirArchivoService.subirArchivo(file, 'usuarios', id).pipe(
            map((resp: any) => {
                this.usuario.img = resp.usuario.img;
                this.guardarStorage(id, this.token, this.usuario, this.menu);
                return true;
            })
        );


    }

    cargarUsuarios(desde: number = 0) {

        const url = URL_SERVICIOS + '/usuario?desde=' + desde;

        return this.http.get(url);


    }

    buscarUsuarios(termino: string) {

        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.usuarios;
            })
        );

    }

    borrarUsuario(id: string) {
        const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

        return this.http.delete(url);
    }

    renuevaToken() {
        const url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;

        return this.http.get(url)
            .pipe(
                map((resp: any) => {
                    this.token = resp.token;
                    localStorage.setItem('token', this.token);

                    return true;
                }),
                catchError(err => {
                    this.router.navigate(['/login']);
                    Swal.fire('No se pudo renovar token', 'No fue posible renovar token', 'error');
                    return throwError(err.message);
                })
            );
    }

}
