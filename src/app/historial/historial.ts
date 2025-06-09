import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html'
})
export class HistorialComponent implements OnInit {
  fotos: any[] = [];
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/gallery').subscribe({
      next: (data) => this.fotos = data,
      error: (err) => this.error = 'Error al cargar imágenes'
    });
  }
}
