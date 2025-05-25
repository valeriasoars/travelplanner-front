import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TripService } from '../../service/trip/trip.service';
import { ViagemModel } from '../../models/viagemModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-trip',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar-trip.component.html',
  styleUrl: './sidebar-trip.component.css'
})
export class SidebarTripComponent implements OnInit{

  @Input() trip?: ViagemModel;
  tripId!: string

  constructor(private tripService: TripService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id');
    if (tripId) {
      this.getTrip(tripId);
    } else {
      console.error('ID da viagem não fornecido na rota.');
    }
  }

  getTrip(id: string){
    this.tripService.getTripById(id).subscribe({
      next: (response) =>{
        this.trip = response.viagem
      },
      error: () =>{

      }
    })
  }


  
}
