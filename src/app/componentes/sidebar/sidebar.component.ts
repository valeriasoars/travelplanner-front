import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { TripService } from '../../service/trip/trip.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements AfterViewInit, OnInit {
  addTripForm!: FormGroup;

  constructor(
    private tripService: TripService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tripForms();
  }

  tripForms() {
    this.addTripForm = this.fb.group({
      destino: ['', [Validators.required]],
      orcamentoTotal: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
    });
  }

  addTrip() {
    if (this.addTripForm.invalid) return;

    const formValue = this.addTripForm.value;

    this.tripService.addTrip(formValue).subscribe({
      next: (response) => {
        this.addTripForm.reset();
        this.toastr.success('Viagem criada com sucesso!');
      },
      error: (err) => {
        const detalhe = err.error?.detalhe;

        if (detalhe) {
          this.toastr.error(detalhe);
        } else {
          this.toastr.error('Erro ao adicionar viagem. Tente novamente.');
        }

        console.error('Erro da API:', err);
      },
    });
  }

  desconect() {
    this.authService.sair();
  }

  ngAfterViewInit(): void {
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    menuToggle?.addEventListener('click', () => {
      wrapper?.classList.toggle('toggled');
    });
  }
}
