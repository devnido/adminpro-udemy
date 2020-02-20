import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { VerificaTokenGuard } from './service.index';

import {
    SettingsService,
    SidebarService,
    SharedService,
    HospitalService,
    MedicoService
} from './service.index';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        LoginGuardGuard,
        SubirArchivoService,
        ModalUploadService,
        HospitalService,
        MedicoService,
        VerificaTokenGuard
    ]
})
export class ServiceModule { }
