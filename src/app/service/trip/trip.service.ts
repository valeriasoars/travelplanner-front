import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ViagemModel } from '../../models/viagemModel';
import { Observable } from 'rxjs';
import { ResponseViagemModel } from '../../models/responseViagemModel';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  addTrip(viagem: ViagemModel): Observable<ResponseViagemModel<ViagemModel>>{
    return this.http.post<ResponseViagemModel<ViagemModel>>(`${this.apiUrl}/viagem`, viagem)
  }

  getTripByUser(): Observable<ResponseViagemModel<ViagemModel[]>>{
    return this.http.get<ResponseViagemModel<ViagemModel[]>>(`${this.apiUrl}/viagem/minhas`)
  }

  getTripById(viagemId: string): Observable<ResponseViagemModel<ViagemModel>>{
    return this.http.get<ResponseViagemModel<ViagemModel>>(`${this.apiUrl}/viagem/detalhes/${viagemId}`)
  }

  deleteTrip(viagemId: string): Observable<ResponseViagemModel<ViagemModel>>{
    return this.http.delete<ResponseViagemModel<ViagemModel>>(`${this.apiUrl}/viagem/${viagemId}`)
  }
}
