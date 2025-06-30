import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../registro.service';

@Component({
  standalone: true,
  selector: 'app-registro-herramienta',
  template: `
    <h2>Registro de Esterilización</h2>

    <form (ngSubmit)="guardarRegistro()">
      <label>Herramienta:</label>
      <select [(ngModel)]="herramientaSeleccionada" name="herramienta" required>
        <option *ngFor="let herramienta of herramientas" [value]="herramienta">{{ herramienta }}</option>
      </select>

      <label>Temperatura (°C):</label>
      <input type="number" [(ngModel)]="temperatura" name="temperatura" required (input)="calcularEstado()" />

      <p>Estado: <strong>{{ estado }}</strong></p>

      <button type="submit">Guardar registro</button>
    </form>

    <hr />

    <h3>Historial</h3>
    <table border="1">
      <tr>
        <th>Herramienta</th>
        <th>Temperatura</th>
        <th>Estado</th>
        <th>Fecha</th>
      </tr>
      <tr *ngFor="let r of registros">
        <td>{{ r.herramienta }}</td>
        <td>{{ r.temperatura }}°C</td>
        <td>{{ r.estado }}</td>
        <td>{{ r.fecha | date:'short' }}</td>
      </tr>
    </table>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 300px;
    }
    table {
      margin-top: 20px;
      width: 100%;
      border-collapse: collapse;
    }
    table, th, td {
      border: 1px solid #000;
    }
    th, td {
      padding: 8px;
      text-align: center;
    }
  `],
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
