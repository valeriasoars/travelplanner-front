import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GastoModel } from '../../models/gastoModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { CategoriaGastoModel } from '../../models/categoriaGastoModel';
import { SaldoModel } from '../../models/saldoModel';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  getGastoByTrip(viagemId: string): Observable<ResponseModel<GastoModel[]>>{
    return this.http.get<ResponseModel<GastoModel[]>>(`${this.apiUrl}/gastos/${viagemId}`)
  }

  getSaldoRestante(viagemId: string): Observable<ResponseModel<SaldoModel>>{
    return this.http.get<ResponseModel<SaldoModel>>(`${this.apiUrl}/gastos/saldo/${viagemId}`)
  }

  addGasto(viagemId: string, gasto: GastoModel): Observable<ResponseModel<GastoModel>>{
    return this.http.post<ResponseModel<GastoModel>>(`${this.apiUrl}/gastos/${viagemId}`, gasto)
  }

  editGasto(gastoId: string, gasto: GastoModel): Observable<ResponseModel<GastoModel>>{
    return this.http.put<ResponseModel<GastoModel>>(`${this.apiUrl}/gastos/${gastoId}`, gasto)
  }

  deleteGasto(gastoId: string): Observable<ResponseModel<GastoModel>>{
    return this.http.delete<ResponseModel<GastoModel>>(`${this.apiUrl}/gastos/${gastoId}`)
  }

  // category
  getCategory(): Observable<ResponseModel<CategoriaGastoModel[]>>{
    return this.http.get<ResponseModel<CategoriaGastoModel[]>>(`${this.apiUrl}/categoria-gasto`)
  }

  getCategoryById(categoriaId: string): Observable<ResponseModel<CategoriaGastoModel>>{
    return this.http.get<ResponseModel<CategoriaGastoModel>>(`${this.apiUrl}/categoria-gasto/${categoriaId}`)
  }

}
