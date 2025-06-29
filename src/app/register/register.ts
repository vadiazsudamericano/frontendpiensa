import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    const user = { username: this.username, password: this.password };
    this.http.post(`${environment.apiUrl}/users/register`, user).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Error al registrar usuario');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
