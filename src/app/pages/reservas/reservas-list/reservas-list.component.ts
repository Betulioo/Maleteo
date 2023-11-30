import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../services/reservas/reservas.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [CommonModule, RouterLink,MatCardModule,MatButtonModule],
  templateUrl: './reservas-list.component.html',
  styleUrl: './reservas-list.component.scss'
})
export class ReservasListComponent {
  reserva: any;

  constructor(private reservaService: ReservasService, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']
    if (!id) return;
    this.reservaService.getReservasById(id).subscribe((reserva)=>{
      this.reserva = reserva;
      console.log(reserva);
      
    })
  });
  }


}
