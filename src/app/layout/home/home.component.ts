import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import {RouterLink} from '@angular/router'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule,FormsModule, FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public isTarifa: boolean = false;
  public isHome: boolean = true;
  public isPrecio: boolean = false;
  public isNot: boolean = true;
  public option: string = '';

  
  constructor(private router: Router) {}

  toggleHome(): void {
    this.isHome = !this.isHome;
  }
  home(): void {
    this.toggleHome();
  }

  toggleTarifa(): void {
    this.isTarifa = !this.isTarifa;
  }
  tarifa(): void {
    this.toggleTarifa();
  }

  togglePrecio(): void {
    this.isPrecio = !this.isPrecio;
    this.isNot = false;
  }
  precio(): void {
    
    this.togglePrecio();
  }

  consultarPrecios(): void {
    this.isHome = false;
    this.isTarifa = false;
    this.isPrecio = true;    
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToBooking(): void {
    this.router.navigate(['/booking']);
  }
  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  continents = [
    { value: 'europa-0', viewValue: 'Europa' },
    { value: 'eeuu-1', viewValue: 'EE.UU' },
    { value: 'latinoamerica-2', viewValue: 'Latinoamerica' },
  ];
}
