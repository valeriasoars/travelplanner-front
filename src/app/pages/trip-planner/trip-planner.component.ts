import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { SidebarTripComponent } from "../../componentes/sidebar-trip/sidebar-trip.component";
import { ViagemModel } from '../../models/viagemModel';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../service/trip/trip.service';
import { PlanejamentoDiarioModel } from '../../models/planejamentoDiarioModel';
import { DaysService } from '../../service/days/days.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService } from '../../service/activity/activity.service';
import { AtividadeModel } from '../../models/atividadeModel';

registerLocaleData(localePt);

@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [SidebarTripComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }] 
})
export class TripPlannerComponent implements OnInit {

  tripId!: string
  trip!: ViagemModel
  days: PlanejamentoDiarioModel[] = []

  activityForm!: FormGroup
  selectedDayId!: string
  activities: AtividadeModel[] = []
  openDays: boolean[] = [];

  constructor(private route: ActivatedRoute, private tripService: TripService, private daysService: DaysService, private activityService: ActivityService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.tripId = this.route.snapshot.paramMap.get('id')!
    
    this.tripService.getTripById(this.tripId).subscribe({
      next: (response) => this.trip = response.viagem,
      error: (err) => console.error('erro', err)
    })

      this.daysService.getDaysByTrip(this.tripId).subscribe({
        next: (response) => {
        this.days = response.dados.map((d: any) => ({
          ...d,
          data: this.normalizeDate(d.data) 
        }))

        
        this.days.forEach(day => {
          this.getActivity(day._id);
        });

        },
        error: (err) => console.error('Erro ao carregar dias', err)
      })

      this.formsActivity()
  }

  formsActivity(){
    this.activityForm = this.fb.group({
        atividade:['', [Validators.required]],
        descricao:['', [Validators.required]],
        horario:['', [Validators.required]],
        local:['', [Validators.required]]
    })
  }

  setSelectedDay(dayId: string) {
    this.selectedDayId = dayId
    this.getActivity(dayId)
  }

  getActivity(id: string){
    this.activityService.getActivityByPlannerId(id).subscribe({
      next: (response) => {
        console.log('Atividades recebidas:', response.dados)
        this.activities = [...this.activities.filter(a => a.planejamentoId !== id), ...response.dados];
      },
      error: (err) => {
        console.error('Erro ao buscar atividades:', err)
      }

    })
  }

  getActivitiesByDay(dayId: string): AtividadeModel[] {
    return this.activities.filter(activity => activity.planejamentoId === dayId);
  }

  addActivity(){
    if(this.activityForm.invalid || !this.selectedDayId) return

    const newActivity = this.activityForm.value

    this.activityService.addActivity(this.selectedDayId, newActivity).subscribe({
      next:(response) => {
        console.log('Atividade adicionada:', response)
        this.activityForm.reset()
      },
      error: (err) => {
        console.error('Erro ao adicionar atividade:', err)
      }
    })
  }




  normalizeDate(dateStr: string): Date {
    const dateOnly = dateStr.split('T')[0]; // Pega apenas a parte da data (YYYY-MM-DD)
    const [year, month, day] = dateOnly.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1 porque Date() usa índice 0-11 para meses
  }

}
