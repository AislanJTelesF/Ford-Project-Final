// app/models/carro.model.ts
export interface Carro {
  nome: string;
  preco: number;
  alturaCacamba: number;
  alturaVeiculo: number;
  alturaSolo: number;
  capacidadeCarga: number;
  motor: number;
  potencia: number;
  volumeCacamba: number;
  roda: string;
  image: string; // Caminho da imagem do carro
}
