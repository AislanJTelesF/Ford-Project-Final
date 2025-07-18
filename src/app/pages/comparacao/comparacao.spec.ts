import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comparacao } from './comparacao';

describe('Comparacao', () => {
  let component: Comparacao;
  let fixture: ComponentFixture<Comparacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comparacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comparacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
