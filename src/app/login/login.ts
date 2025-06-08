import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    this.http.post(`${environment.apiUrl}/auth/login`, credentials).subscribe({
      next: () => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/historial']);
      },
      error: () => {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
