import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../models/loginModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { RegisterModel } from '../../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.urlApi

  constructor(private http: HttpClient) { }

  login(login: LoginModel): Observable<ResponseModel<LoginModel>>{
    return this.http.post<ResponseModel<LoginModel>>(`${this.apiUrl}/usuario/logar`, login)
  }

  register(register: RegisterModel): Observable<ResponseModel<RegisterModel>>{
    return this.http.post<ResponseModel<RegisterModel>>(`${this.apiUrl}/usuario/cadastrar`, register)
  }
}
