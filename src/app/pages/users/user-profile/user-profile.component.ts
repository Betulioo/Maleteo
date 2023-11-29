import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  username = '';
  userProfile: IUser | undefined;
  muestra = false;

  userForm = new FormGroup({
    _id: new FormControl<string>(''),
    username: new FormControl<string>('', [

      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    nombre: new FormControl<string>(''),
    apellido: new FormControl<string>(''),
    gender: new FormControl<string>(''),
    foto: new FormControl<string>('')
  });

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}


  toggleMuestra(): void {
    this.muestra = !this.muestra;
  }
  muestrea(): void {
    this.toggleMuestra();
  }

  getUserPhotoUrl(): string {
    return this.userForm.get('foto')?.value || this.userProfile?.foto || '';
  }

  ngOnInit(): void {

    // console.log(this.authService.getId());

      let id = this.authService.getId();
      // let id = this.activatedRoute.snapshot.params['id'];


    this.authService.isLoggedIn.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn)
    );
    this.authService.isAdmin.subscribe((admin) => (this.isAdmin = admin));
    this.authService.isUser.subscribe((user) => (this.isUser = user));




    this.authService.findCurrentUser(id).subscribe((data) => {

      this.userProfile = data;
      // console.log(data);

      this.userForm.reset({
        _id: this.userProfile._id,
        email: this.userProfile.email,
        nombre: this.userProfile.nombre,
        apellido: this.userProfile.apellido,
        foto: this.userProfile.foto
      });
    });
  }

  save(): void {
    let id = this.userForm.get('_id')?.value ?? '';
    let email = this.userForm.get('email')?.value ?? '';
    let nombre = this.userForm.get('nombre')?.value ?? '';
    let apellido = this.userForm.get('apellido')?.value ?? '';
    let foto = this.userForm.get('foto')?.value ?? '';

    let user: IUser = {
      _id: id,
      email: email,
      nombre: nombre,
      apellido: apellido,
      foto: foto
    };
    // console.log(user);

    this.usersService
      .updateUser(user)
      .subscribe((data) => console.log('usuario actualizado'));
  }
}
