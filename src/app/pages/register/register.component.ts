import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { InitialComponent } from "../initial/initial.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, InitialComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private toastr: ToastrService){}

  ngOnInit():void{
    this.formsRegister()
  }

  formsRegister(){
    this.formRegister = this.fb.group({
      nome:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required]],
      confirmarSenha:['', [Validators.required]]
    })
  }

  register(){
    if(this.formRegister.invalid) return

    const {senha, confirmarSenha} = this.formRegister.value

    if (senha !== confirmarSenha) {
      this.toastr.error('As senhas não coincidem.', 'Erro');
      return;
    }

    this.authService.register(this.formRegister.value).subscribe({
      next: (response) =>{
        this.toastr.success('Cadastro realizado com sucesso! Agora você pode fazer login para continuar.', 'Sucesso');
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.toastr.error('Ocorreu um erro ao cadastrar. Tente novamente.', 'Erro');
      }
    })
  }
}
