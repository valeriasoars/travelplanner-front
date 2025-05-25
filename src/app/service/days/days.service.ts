import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { PlanejamentoDiarioModel } from '../../models/planejamentoDiarioModel';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  getDaysByTrip(tripId: string): Observable<ResponseModel<PlanejamentoDiarioModel[]>>{
    return this.http.get<ResponseModel<PlanejamentoDiarioModel[]>>(`${this.apiUrl}/planejamento-diario/${tripId}`)
  }
}
