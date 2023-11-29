import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  username = '';
 constructor(private router: Router, public authService: AuthService){}
  ngOnInit(): void {

    this.authService.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.authService.isAdmin.subscribe(admin => this.isAdmin = admin);
    this.authService.isUser.subscribe(user => this.isUser = user);
    this.authService.currentUserName.subscribe(currentUserName => this.username = currentUserName);
  }
  // navigateToLogin(): void { this.router.navigate(['/reservar']); }


}
