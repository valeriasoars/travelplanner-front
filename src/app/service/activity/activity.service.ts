import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtividadeModel } from '../../models/atividadeModel';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  addActivity(planejamentoId: string, atividade: AtividadeModel): Observable<ResponseModel<AtividadeModel>>{
    return this.http.post<ResponseModel<AtividadeModel>>(`${this.apiUrl}/atividade/${planejamentoId}`, atividade)
  }

  getActivityByPlannerId(planejamentoId: string): Observable<ResponseModel<AtividadeModel[]>>{
    return this.http.get<ResponseModel<AtividadeModel[]>>(`${this.apiUrl}/atividade/${planejamentoId}`)
  }

  editActivity(activityId: string, atividade: AtividadeModel): Observable<ResponseModel<AtividadeModel>>{
    return this.http.put<ResponseModel<AtividadeModel>>(`${this.apiUrl}/atividade/${activityId}`, atividade)
  }

  deleteActivity(activityId: string): Observable<ResponseModel<AtividadeModel>>{
    return this.http.delete<ResponseModel<AtividadeModel>>(`${this.apiUrl}/atividade/${activityId}`)
  }
}
