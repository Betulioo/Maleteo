import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AnunciosService } from '../../../services/anuncios/anuncios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnuncio } from '../../../models/anuncio.model';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';


 
@Component({
  selector: 'app-anuncio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, FormsModule,MatInputModule],
  templateUrl: './anuncio-form.component.html',
  styleUrl: './anuncio-form.component.scss'
})
export class AnuncioFormComponent {

  anuncioForm = new FormGroup({
    _id: new FormControl<string>(''),
    titulo: new FormControl <string>('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    propiedad: new FormControl <string>('', ),
    tipo: new FormControl <string>('', ),
    direccion: new FormControl <string>('', [Validators.maxLength(100)]),
    descripcion:  new FormControl <string>('', [Validators.maxLength(700)]),
    isTaken: new FormControl <boolean>(false),
    image: new FormControl<string>(""),
    precio: new FormControl<number>(0, [Validators.required, Validators.min(5), Validators.max(100), Validators.pattern("^[0-9]+([.,][0-9]{1,2})?$")
    ]),
    servicio: new FormControl <string>('', [Validators.maxLength(300)]),
    horario: new FormControl<Date>(new Date()),
});

constructor(
private anuncioService: AnunciosService,
private activatedRoute: ActivatedRoute,
private router: Router,
) {}


ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    const id = params['id']
    // console.log("hola")
    if (!id) return;
    this.anuncioService.findById(id).subscribe(user => this.loadAnuncioForm(user));
    
    
  });

}

loadAnuncioForm(anuncio: IAnuncio): void{
  this.anuncioForm.reset({
    _id: anuncio._id,
    titulo: anuncio.titulo,
    propiedad: anuncio.propiedad,
    tipo: anuncio.tipo,
    direccion: anuncio.direccion,
    descripcion: anuncio.descripcion,
    isTaken: anuncio.isTaken,
    image: anuncio.image,
    precio: anuncio.precio,
    servicio: anuncio.servicio,
    horario:anuncio.horario
  });
}

save(event: Event): void {
  event.preventDefault();
  // console.log('holiiita')
  
    let _id = this.anuncioForm.get('_id')?.value ?? '';
    let titulo = this.anuncioForm.get('titulo')?.value ?? '';
    let propiedad = this.anuncioForm.get('propiedad')?.value ?? 'casa';
    let tipo = this.anuncioForm.get('tipo')?.value ?? 'habitacion';
    let direccion = this.anuncioForm.get('direccion')?.value ?? '';
    let descripcion = this.anuncioForm.get('descripcion')?.value ?? '';
    let isTaken = this.anuncioForm.get('isTaken')?.value ?? false;
    let image = this.anuncioForm.get('image')?.value ?? "";
    let precio = this.anuncioForm.get('precio')?.value ?? 0;
    let servicio = this.anuncioForm.get('servicio')?.value ?? '';
    let horario = this.anuncioForm.get('horario')?.value ?? new Date()


    let anuncio: IAnuncio ={
      _id: _id,
      titulo: titulo,
      propiedad: propiedad,
      tipo: tipo,
      direccion: direccion,
      descripcion: descripcion,
      isTaken: isTaken,
      image: image,
      precio: precio,
      servicio: servicio, 
      horario: horario,
    }
    let anuncio2: IAnuncio ={
      titulo: titulo,
      propiedad: propiedad,
      tipo: tipo,
      direccion: direccion,
      descripcion: descripcion,
      isTaken: isTaken,
      image: image,
      precio: precio,
   servicio: servicio, 
      horario: horario,
    }
    console.log(this.anuncioForm.value)

    if (!_id) {
      if (this.anuncioForm.valid) {
        this.anuncioService.create(anuncio2).subscribe((anuncioCreado) => {
          this.router.navigate(['/home']);
          console.log('Anuncio creado', anuncioCreado);
        });
      } else {
        console.log('Formulario crear inválido');
      }
    } else {
      if (this.anuncioForm.valid) {
        this.anuncioService.update(anuncio).subscribe((anuncioActualizado) => { 
          console.log('Anuncio actualizado', anuncioActualizado);
        });
      } else {
        console.log('Formulario acutalizar inválido');
      }
    }
}

showInputs: boolean = false;
inputs: string[] = [];
}
