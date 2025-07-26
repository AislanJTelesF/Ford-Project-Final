// src/app/services/dashboardService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model'; // Certifique-se que o caminho está correto
import { CarroVin } from '../utils/carroVinInterface'; // Certifique-se que o caminho está correto
import { environment } from '../../environments/environment'; // Importa o ambiente

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl; // Usa a URL da API do arquivo de ambiente

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<{ vehicles: Veiculo[] }> {
    return this.http.get<{ vehicles: Veiculo[] }>(`${this.apiUrl}/vehicles`);
  }

  buscarVin(vin: string): Observable<CarroVin> {
    return this.http.post<CarroVin>(`${this.apiUrl}/vehicleData`, { vin });
  }
}
