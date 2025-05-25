import { Routes } from '@angular/router';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { TripsComponent } from './pages/trips/trips.component';
import { SidebarTripComponent } from './componentes/sidebar-trip/sidebar-trip.component';
import { TripPlannerComponent } from './pages/trip-planner/trip-planner.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { InitialComponent } from './pages/initial/initial.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:'', component:InitialComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'trips', component: TripsComponent},
    {path:'planner/:id', component: TripPlannerComponent},
    {path:'itinerary/:id', component: ItineraryComponent},
    {path:'budget/:id', component:BudgetComponent},
];
