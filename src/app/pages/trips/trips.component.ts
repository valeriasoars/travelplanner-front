import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../componentes/sidebar/sidebar.component";
import { Router, RouterLink } from '@angular/router';
import { ViagemModel } from '../../models/viagemModel';
import { TripService } from '../../service/trip/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [SidebarComponent,  CommonModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit {

  tripId!: string;
  trips: ViagemModel[] = []
  

  constructor(private router: Router, private tripService: TripService) {}

  ngOnInit(): void {
    this.loadTrips()
  }
  loadTrips(): void{
    this.tripService.getTripByUser().subscribe({
      next: (response) => {
        this.trips = response.viagens
      },
      error: (error) => {
       console.error('Erro ao carregar viagens:', error);
      }
    })
  }

  deleteTrip(id: string): void{
    this.tripService.deleteTrip(id).subscribe({
      next:() => {
        this.trips = this.trips.filter(trip => trip._id !== id)
      },
      error: (error) => {
        console.error('Erro ao deletar viagem:', error);
      }
    })
  }

  goToPlanner(tripId: string) {
    this.router.navigate(['/planner', tripId]);
  }
}
