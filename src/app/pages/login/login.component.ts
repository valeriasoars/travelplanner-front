import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.formsLogin()
  }

  formsLogin(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required]]
    })
  }

  login(){
    if(this.loginForm.invalid) return

    const formValue = this.loginForm.value

    this.authService.login(formValue).subscribe({
      next:(response) => {
        localStorage.setItem('token', response.token)
        console.log(response.mensagem)
        this.router.navigate(['/trips'])
        this.toastr.success('Login realizado com sucesso!', 'Sucesso')
      },
      error: (error) => {
        if (error.status === 401) {
          this.toastr.error('E-mail ou senha incorretos.', 'Erro de Autenticação');
        } else if (error.status === 404) {
          this.toastr.error('Usuário não encontrado.', 'Erro');
        } else {
           this.toastr.error(error.error?.mensagem || 'Erro ao realizar login.', 'Erro');
        }
      }
    })
  }
}
