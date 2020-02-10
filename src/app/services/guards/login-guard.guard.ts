import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }


  canActivate(): boolean {

    console.log('Paso por el Login Guard');

    if (this._usuarioService.estaLogueado()) {
      console.log('Acceso Habilitado');
      return true;
    } else {
      console.log('Acceso Denegado');
      this.router.navigate(['/login']);
      return false;
    }


  }

}
