import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(public http: HttpClient) { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    const formData = new FormData();

    const xhr = new XMLHttpRequest();

    formData.append('imagen', archivo, archivo.name);

    return this.http.put(url, formData, { reportProgress: true })
      .pipe(
        map((resp: any) => {




          return resp;
        })
      );

  }
}
