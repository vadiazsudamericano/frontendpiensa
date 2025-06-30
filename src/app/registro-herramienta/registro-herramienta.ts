import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../registro.service';

@Component({
  standalone: true,
  selector: 'app-registro-herramienta',
  templateUrl: './registro-herramienta.component.html',
  styleUrls: ['./registro-herramienta.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegistroHerramientaComponent implements OnInit {
  herramientaSeleccionada = '';
  temperatura = 0;
  estado = '';
  registros: any[] = [];

  herramientas = ['Pinza de Kocher', 'Bisturí', 'Tijeras Mayo', 'Separador Farabeuf'];

  constructor(private registroService: RegistroService) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  calcularEstado() {
    this.estado = this.temperatura >= 121 ? 'Esteril' : 'No Esteril';
  }

  guardarRegistro() {
    this.calcularEstado();
    const registro = {
      herramienta: this.herramientaSeleccionada,
      temperatura: this.temperatura,
      estado: this.estado,
      fecha: new Date().toISOString()
    };

    this.registroService.guardarRegistro(registro).subscribe(() => {
      this.obtenerRegistros();
      this.herramientaSeleccionada = '';
      this.temperatura = 0;
      this.estado = '';
    });
  }

  obtenerRegistros() {
    this.registroService.obtenerRegistros().subscribe((data) => {
      this.registros = data;
    });
  }
}
