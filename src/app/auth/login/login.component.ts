import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm = new FormGroup({
    email: new FormControl<string>('',[Validators.required, Validators.email]),
    contraseña: new FormControl<string>('',[Validators.required, Validators.minLength(8)] ),
});

constructor(
    private authService: AuthService,
    private router: Router
    ) {}

save():void {
        console.log('esta entrando');

        if (this.userForm.valid) {
          let login = {
            email: this.userForm.get('email')?.value ?? '',
            contraseña: this.userForm.get('contraseña')?.value ?? '',
          };
          this.authService.login(login).subscribe((user) => {

            // console.log(user);

            localStorage.setItem('token', user.token);
            this.authService.handleLoginResponse(user.token);
            this.router.navigate(['/home']);
          });
        } else {
          console.log('form invalido');
        }


}
}
