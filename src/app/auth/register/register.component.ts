import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  userForm = new FormGroup({
    _id: new FormControl<string>(""),
    email: new FormControl<string>('',),
    contraseña: new FormControl<string>('', ),
    nombre: new FormControl<string>(''),
    apellido: new FormControl<string>(''),
    isGuardian: new FormControl<boolean>(false),
    date: new FormControl<Date>(new Date() ),
    gender: new FormControl<string>("not"),
    role: new FormControl<string>(""),
    foto: new FormControl<string>(" "),
  });


  constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService,private router: Router,){}
  isCreate: boolean = true;

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        const id = params['id']
        if (!id) return;
        this.usersService.getUserById(id).subscribe(user => this.loaduserFrom(user));
        // console.log(this.productForm)
      });

    }
    resetForm(): void {
      this.userForm.reset();
    }
    loaduserFrom(user: IUser): void {
      this.userForm.reset({
        _id: user._id,
        email: user.email,
        contraseña: user.contraseña,
        nombre: user.nombre,
        apellido: user.apellido,
        isGuardian: user.isGuardian,
        date: user.date,
        gender: user.gender,
        foto: user.foto,


      });
  }
  save(): void {
    console.log('esta entrando');

    if (this.userForm.valid){

      let _id=this.userForm.get('_id')?.value ?? '';
      let email = this.userForm.get('email')?.value?? '';
      let contraseña = this.userForm.get('contraseña')?.value?? '';
      let nombre = this.userForm.get('nombre')?.value?? "";
      let apellido = this.userForm.get('apellido')?.value?? '';
      let isGuardian = this.userForm.get('isGuardian')?.value?? false;
      let date = this.userForm.get('date')?.value?? new Date() ;
      let gender = this.userForm.get('gender')?.value?? '';
      let foto = this.userForm.get('foto')?.value?? '';


      let user: IUser ={
        _id: _id,
        email: email,
        contraseña: contraseña,
        nombre: nombre,
        apellido: apellido,
        date: date,
        isGuardian: isGuardian,
        gender: gender,
        foto: foto,
      }

      let user2: IUser ={
        // _id: _id,
        email: email,
        contraseña: contraseña,
        nombre: nombre,
        apellido: apellido,
        date: date,
        isGuardian: isGuardian,
        gender: gender,
        foto: foto,
      }


      if (!_id){
            console.log(user2);

          this.usersService.createUser(user2).subscribe(userin => { console.log(userin); this.router.navigate(['/login'])});
        }else {
      this.usersService.updateUser(user).subscribe(userin => this.router.navigate(['/users', userin._id]))}
    } else {
      console.log('form invalido')
    }
}
}
