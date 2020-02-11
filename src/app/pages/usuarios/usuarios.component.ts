import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe((resp: any) => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });

  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }


    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {
    console.log(termino);


    if (termino.length <= 0) {
      this.cargarUsuarios();

      return;
    }


    this.cargando = true;

    this.usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;

      });

  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);

    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire('No se puede borrar usuarios', 'No se puede borrar a si mismo', 'error');
      return;
    }

    Swal.fire('No se puede borrar usuarios', 'No se puede borrar a si mismo', 'error');
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this.usuarioService.borrarUsuario(usuario._id)
          .subscribe((resp: any) => {
            console.log(resp);

            this.cargarUsuarios();

            Swal.fire(
              'Eliminado!',
              'El usuario se ha eliminado exitosamente.',
              'success'
            );

          });


      }
    });

  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire(
          'Usuario Actualizado!',
          'El usuario ' + usuario.nombre + ' se ha actualizado exitosamente.',
          'success'
        );
      }

      );
  }

}
