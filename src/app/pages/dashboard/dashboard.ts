import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideBar } from '../../side-bar/side-bar';
import { DashboardService } from '../../services/dashboardService';
import { Veiculo } from '../../models/veiculo.model';
import { VehicleData } from '../../models/vehicleData.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarroVin } from '../../utils/carroVinInterface';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBar, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, OnDestroy {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  carroVin!: CarroVin;
  reqVin!: Subscription;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  constructor(private dashboardservice: DashboardService) {}

  ngOnInit(): void {
    this.dashboardservice
      .getVehicles()
      .subscribe((res: { vehicles: Veiculo[] }) => {
        this.vehicles = res.vehicles;
      });

    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      const selected = this.vehicles.find((v) => v.id === +id!);
      if (selected) this.selectedVehicle = selected;
    });

    this.vinForm.controls.vin.valueChanges.subscribe((valor) => {
      this.reqVin = this.dashboardservice
        .buscarVin(valor as string)
        .subscribe((res: CarroVin) => {
          this.carroVin = res;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.reqVin) this.reqVin.unsubscribe();
  }

  onSearchVin(): void {
  const vin = this.vinForm.controls.vin.value;
  if (vin) {
    this.reqVin = this.dashboardservice.buscarVin(vin).subscribe((res: CarroVin) => {
      this.carroVin = res;
    });
  }
}


}

