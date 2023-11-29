import { Component, EventEmitter, Input, NgZone, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnunciosService } from '../../../services/anuncios/anuncios.service';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IAnuncio } from '../../../models/anuncio.model';
import { IUser } from '../../../models/user.model';
import { GoogleMap, GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-anuncio-detail',
  standalone: true,
  imports: [CommonModule,GalleriaModule, GoogleMapsModule, RouterLink],
  templateUrl: './anuncio-detail.component.html',
  styleUrl: './anuncio-detail.component.scss'
})
export class AnuncioDetailComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() ide: any; 
  
  
  anuncio!: any;
  user!: any;
  tipo!: any;
  idUser!: any;
  
  fotos: any | undefined;
      responsiveOptions: any[] = [
          {
              breakpoint: '1024px',
              numVisible: 5
          },
          {
              breakpoint: '768px',
              numVisible: 3
          },
          {
              breakpoint: '560px',
              numVisible: 1
          }
      ];
  
  
  constructor(private anuncioService: AnunciosService, private usersService: UsersService, private activatedRoute: ActivatedRoute, private ngZone: NgZone){}
  
  
  ngOnChanges(changes: SimpleChanges): void{
    console.log('Cambio en la propiedad "mensaje"', changes['ide']);
    if (changes['ide']){
      this.anuncioService.findById(this.ide).subscribe((data: IAnuncio)=>{
        console.log(data);
  
        this.anuncio = data;
        this.tipo = data;
        this.fotos = data.image;
        this.idUser = data.user;
  
  
  
        this.usersService.getUserById(this.idUser).subscribe((data: IUser)=>{
          this.user = data;
          console.log(data);
        });
  
    })
  }
  }
  ngOnInit(): void {
  
      
  // console.log(this.ide);
  
  //     this.anuncioService.findById(this.ide).subscribe((data: IAnuncio)=>{
  //       this.anuncio = data;
  //       this.tipo = data;
  //       this.fotos = data.image;
  //       this.idUser = data.user;
  //       console.log(data);
        
  
  //       this.usersService.getUserById(this.idUser).subscribe((data: IUser)=>{
  //       this.user = data;
  //       console.log(data);
  //     });
  //     });
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
  
  }
  
  /////MAPS
  
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
    @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;
    @ViewChild('search') searchElementRef: any;
  
    zoom = 12;
    center!: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      mapTypeId: 'hybrid',
      maxZoom: 15,
      minZoom: 8,
    };
    markers: any[] = [];
    infoContent = '';
    markerPositions: google.maps.LatLngLiteral[] = [];
    markerOptions: google.maps.MarkerOptions = {draggable: false};
    onMapLoad(mapInstance: any) {
      this.map = mapInstance;
    }
    
    setupPlaceAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry) {
            if(this.map)
            this.map.getCenter();
          console.log();
  
            // Puedes hacer más cosas con la ubicación seleccionada
          }
        });
      });
    }
  
  
    addMarker(event: google.maps.MapMouseEvent) {
      if(event.latLng)
      this.markerPositions.push(event.latLng.toJSON());
    }
  
    zoomIn() {
      if(this.options.maxZoom)
      if (this.zoom < this.options.maxZoom) this.zoom++;
    }
  
    zoomOut() {
      if(this.options.minZoom)
  
      if (this.zoom > this.options.minZoom) this.zoom--;
    }
  
    click(event: google.maps.KmlMouseEvent) {
      console.log(event);
    }
  
  
  
  }
  