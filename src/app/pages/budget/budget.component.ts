import { Component } from '@angular/core';
import { SidebarTripComponent } from "../../componentes/sidebar-trip/sidebar-trip.component";

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [SidebarTripComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {

}
