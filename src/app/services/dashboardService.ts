import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculosAPI } from '../models/veiculo.model';
import { CarroVin } from '../utils/carroVinInterface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}



  getVehicles(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/api/vehicles`);
  }

  buscarVin(codigoVin: string): Observable<CarroVin> {
    const reqVin = this.http.post<CarroVin>(`${this.apiUrl}/api/vehicleData`, {
      vin: codigoVin,
    });
    return reqVin;
  }
}
