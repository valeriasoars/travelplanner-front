import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnComponent } from "../btn/btn.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, BtnComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
