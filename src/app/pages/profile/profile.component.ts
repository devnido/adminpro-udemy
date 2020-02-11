import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  usuario: Usuario;
  imagenSubir: File;
  imagenTemp;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {
    console.log(usuario);

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }


    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe((resp: any) => {
        console.log(resp);

        Swal.fire('Usuario Actualizado', this.usuario.nombre, 'success');

      });

  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }


    if (archivo && archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    console.log(archivo);


    this.imagenSubir = archivo;

    console.log(this.imagenSubir);


    let reader = new FileReader();

    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => { this.imagenTemp = reader.result; };


  }

  cambiarImagen() {

    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');

      });

    return true;

  }

}
