import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: []
})
export class MedicoComponent implements OnInit {

    hospitales: Hospital[] = [];
    hospital: Hospital = new Hospital('');
    medico: Medico = new Medico('', '', '', this.hospital, '');

    constructor(public medicoService: MedicoService,
        public hospitalService: HospitalService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public modalUploadService: ModalUploadService) {

        activatedRoute.params.subscribe(params => {
            const id = params.id;

            if (id !== 'nuevo') {
                this.cargarMedico(id);
            }
        });
    }

    ngOnInit(): void {
        this.hospitalService.cargarHospitales()
            .subscribe(hospitales => this.hospitales = hospitales);

        this.modalUploadService.notificacion.subscribe((resp: any) => {
            // tslint:disable-next-line: no-shadowed-variable
            this.medico.img = resp.medico.img;

        });

    }

    guardarMedico(f: NgForm) {

        console.log(f.valid);
        console.log(f.value);

        if (f.invalid) {
            return;

        }

        this.medicoService.guardarMedico(this.medico)
            .subscribe((medico: Medico) => {

                this.medico._id = medico._id;


                Swal.fire('Medico actualizado', medico.nombre, 'success');

                this.router.navigate(['/medico', medico._id]);

            });

    }

    cambioHospital(id: string) {

        this.hospitalService.obtenerHospital(id)
            .subscribe((hospital: Hospital) => {
                console.log(hospital);

                this.hospital = hospital;

            });


    }

    cargarMedico(id: any) {
        this.medicoService.cargarMedico(id)
            .subscribe(_medico => {

                const hospitalID = _medico.hospital._id;

                console.log(_medico.hospital._id);

                this.medico = _medico;
                this.medico.hospital = _medico.hospital._id;


                console.log(this.hospital);

                this.cambioHospital(hospitalID);
            });
    }



    cambiarFoto() {
        this.modalUploadService.mostrarModal('medicos', this.medico._id);
    }

}
