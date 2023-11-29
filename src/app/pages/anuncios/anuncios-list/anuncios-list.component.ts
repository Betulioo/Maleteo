import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnunciosService } from '../../../services/anuncios/anuncios.service';
import { UsersService } from '../../../services/users/users.service';
import { IAnuncio } from '../../../models/anuncio.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AnuncioDetailComponent } from '../anuncio-detail/anuncio-detail.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-anuncios-list',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, AnuncioDetailComponent,CarouselModule,TagModule, RouterLink],
  templateUrl: './anuncios-list.component.html',
  styleUrl: './anuncios-list.component.scss'
})
export class AnunciosListComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() item: any; 
  idUserpadre: any= "";
  idestaes: any= "";
  addItem(newItem: string) {
    this.idUserpadre = newItem;
    // console.log(this.idUserpadre)
    
  }
  
  
  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    // console.log(value);
    
    
  }
  obtenerId(objeto: any) {
  
    this.idestaes =objeto._id
    console.log(this.idestaes);
    
    return 
  }
  
    isLoggedIn = false;
    isAdmin = false;
    anuncios: any;
    responsiveOptions: any[] | undefined;
    verDetalle: boolean = false;
  anuncioId: any ;
  constructor(private anuncioService: AnunciosService, private userService: UsersService, private snackbar: MatSnackBar){}
  
  ngOnChanges(changes: SimpleChanges): void{
    console.log('Cambio en la propiedad "mensaje"', changes['item']);
    if (changes['item']){
      this.anuncioService.findBydireccion(this.item).subscribe((anuncios) => {
        this.anuncios = anuncios;
    // console.log(anuncios);
  
    })
  }
  }
    ngOnInit(): void {
  
  this.anuncioService.findBydireccion(this.item).subscribe((anuncios) => {
    this.anuncios = anuncios;
    
  });
  
  // item tiene que cambiar y hacer ejecutar otra vez el componente
  this.responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
  ];
  }
  muestraDetalle():void{
    if(this.idestaes){
    this.verDetalle = true;}
  }
  // getSeverity(status: any) {
  // switch (status) {
  //   case 'INSTOCK':
  //       return 'success';
  //   case 'LOWSTOCK':
  //       return 'warning';
  //   case 'OUTOFSTOCK':
  //       return 'danger';
  // }
  // }
  
  deleteProduct(product: IAnuncio) {
    if(product._id){
    this.anuncioService.deleteById(product._id).subscribe({
      next: response => {
        //se verifica si el código de estado de la respuesta es 200 o 204, indica una eliminación exitosa.
        if (response.status === 200 || response.status === 204) {
          console.log('Se ha borrado correctamente');
          //si se elimina correctamente se vuelve a cargar la lista de libros
          this.ngOnInit();
        } else {
          console.log('Se ha producido un error');
          this.snackbar.open('Se ha producido un error, inténtalo más tarde.', 'Cerrar', {duration: 3000});
        }
      },
      error: error => {
        console.log(error);
        this.snackbar.open('Se ha producido un error, inténtalo más tarde.', 'Cerrar', {duration: 3000});
      },
    });
  }
  }
    }
    
  
  
  