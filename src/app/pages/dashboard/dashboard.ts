// app/pages/dashboard/dashboard.ts
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
import { MatDialog } from '@angular/material/dialog';
import { VinDataDialogComponent } from './vin-data-dialog/vin-data-dialog';

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

  reqVin!: Subscription;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  // CORRIGIDO: Removido 'new' duplicado
  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  constructor(private dashboardservice: DashboardService, private dialog: MatDialog) {}

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

    // CORRIGIDO: Tipagem explícita para 'valor'
    this.vinForm.controls.vin.valueChanges.subscribe((valor: string | null) => {
      if (valor && valor.length > 0) {
        this.reqVin = this.dashboardservice
          .buscarVin(valor as string)
          .subscribe((res: CarroVin) => {
            this.openVinDataDialog(res);
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.reqVin) this.reqVin.unsubscribe();
  }

  openVinDataDialog(data: CarroVin): void {
    this.dialog.open(VinDataDialogComponent, {
      data: data,
      width: '600px',
      panelClass: 'custom-dialog-container'
    });
  }

  onSearchVin(): void {
    const vin = this.vinForm.controls.vin.value;
    if (vin) {
      this.reqVin = this.dashboardservice.buscarVin(vin).subscribe((res: CarroVin) => {
        this.openVinDataDialog(res);
      });
    }
  }
}
