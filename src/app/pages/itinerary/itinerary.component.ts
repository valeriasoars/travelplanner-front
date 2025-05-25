import { Component } from '@angular/core';
import { SidebarTripComponent } from "../../componentes/sidebar-trip/sidebar-trip.component";

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [ SidebarTripComponent],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css'
})
export class ItineraryComponent {

}
