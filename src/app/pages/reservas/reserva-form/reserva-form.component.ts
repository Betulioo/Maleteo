import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ReservasService } from '../../../services/reservas/reservas.service';
import { AnunciosService } from '../../../services/anuncios/anuncios.service';
import { IReserva } from '../../../models/reserva.model';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AnunciosListComponent } from '../../anuncios/anuncios-list/anuncios-list.component';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, FooterComponent, MatFormFieldModule, MatSelectModule,AnunciosListComponent, ReactiveFormsModule, MatInputModule, RouterLink ],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.scss'
})
export class ReservaFormComponent {

  idAnunciolist: any= "";
  addItem(newItem: string) {
    this.idAnunciolist = newItem;
    console.log(this.idAnunciolist)
    
  }
  public mostrarAnuncios: boolean = false;
  mostrarExperiencias: boolean = false;
  
  id: any;
  ubicacion: any;
  // falta recoger el id del anuncio seleccionado y pasarlo a la funcion
  anuncio: any;
  
  continents = [
    { value: '10:00', viewValue: '10:00' },
    { value: '11:00', viewValue: '11:00' },
    { value: '12:00', viewValue: '12:00' },
    { value: '13:00', viewValue: '13:00' },
    { value: '14:00', viewValue: '14:00' },
    { value: '15:00', viewValue: '15:00' },
    { value: '16:00', viewValue: '16:00' },
    { value: '17:00', viewValue: '17:00' },
    { value: '18:00', viewValue: '18:00' },
    { value: '19:00', viewValue: '19:00' },
    { value: '20:00', viewValue: '20:00' },
    { value: '21:00', viewValue: '21:00' },

  ];
  Ubicaciones = [
    { value: 'Valencia', viewValue: 'Valencia' },
    { value: 'Madrid', viewValue: 'Madrid' },
    { value: 'Barcelona', viewValue: 'Barcelona' },
  ];
  
  reservaForm = new FormGroup({
    user: new FormControl<string[]>(['']),
    anuncio: new FormControl<string[]>([''], [Validators.required]),
    fecha: new FormControl<Date>(new Date),
    direccion: new FormControl<string>(""),
    deposito: new FormControl<string>(""),
    retirada: new FormControl<string>(""),
    equipaje: new FormControl<number>(0, [Validators.maxLength(10)]),
    comienzo: new FormControl<Date | null>(null),
    final: new FormControl<Date | null>(null),

  });
userForm: any;

  constructor(
    private reservaService: ReservasService,
    // private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private anuncioService: AnunciosService,
    private formBuilder: FormBuilder,
    private router: Router
    
  ){}

  ngOnInit(): void {
   this.id = this.authService.getId()
  // falta recoger el id del anuncio seleccionado y pasarlo a la funcion
    this.anuncio = this.anuncioService.findById(this.idAnunciolist).subscribe((data)=>{
      // console.log(data);
      
    })
  }
  toggleHome(): void {
    this.mostrarAnuncios = !this.mostrarAnuncios;
  }
  home(): void {
    this.toggleHome();
       
  }
  toggleExperiencias() {
    this.mostrarExperiencias = !this.mostrarExperiencias;
  }

  // Función para obtener el texto del botón
  getExperiencias(): string {
    return this.mostrarExperiencias ? 'Mostrar menos' : 'Mostrar más';
  }
loadReserva(reserva: IReserva){
  this.reservaForm.reset({
    user: reserva.user,
    anuncio: reserva.anuncio,
    fecha: reserva.fecha,
    deposito: reserva.deposito,
    retirada: reserva.retirada,
    equipaje: reserva.equipaje,
    comienzo: reserva.tiempoStart,
    final: reserva.tiempoEnd,

  })
}
search():any{

  this.ubicacion =  this.reservaForm.get('direccion')?.value ?? new Date;
  this.mostrarAnuncios = true
  // console.log(this.ubicacion);
  

}

save(event: Event):void {
  event.preventDefault();
  if(this.reservaForm.valid){

    let user = this.reservaForm.get('user')?.value ?? [''];
    let anuncio = this.reservaForm.get('anuncio')?.value ??[''];
    let fecha = this.reservaForm.get('fecha')?.value ?? new Date;
    let deposito = this.reservaForm.get('deposito')?.value ?? "";
    let retirada = this.reservaForm.get('retirada')?.value ?? "";
    let equipaje = this.reservaForm.get('equipaje')?.value ?? 0;
    let tiempoStart = this.reservaForm.get('start')?.value ?? new Date;
    let tiempoEnd = this.reservaForm.get('end')?.value ?? new Date;



    let reserva: IReserva={

      user: this.id,
      anuncio: this.idAnunciolist,
      fecha: fecha,
      deposito: deposito,
      retirada: retirada,
      equipaje: equipaje,
      tiempoStart: tiempoStart,
      tiempoEnd: tiempoEnd

    }
    
        // console.log(reserva);
        // console.log(this.idAnunciolist);
        if (this.reservaForm.valid){
      this.reservaService.createReservas(reserva).subscribe(reser => {
        //  console.log("ya esta reserva", reser._id);

        this.router.navigate(['reserva', reser._id])
        
        });}
     
        // this.reservaService.updateReservas(reserva).subscribe(reser => this.router.navigate(['/', reser.userId]))}
        }else  {
        console.log('form invalido')
      }
    }
}
