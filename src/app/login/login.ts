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
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const user = { email: this.email, password: this.password };

    this.http.post<{ success: boolean }>(`${environment.apiUrl}/auth/login`, user).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/historial']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: () => {
        alert('Error en el servidor o credenciales inválidas');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
