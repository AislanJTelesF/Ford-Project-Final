import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visita } from './visita';

describe('Visita', () => {
  let component: Visita;
  let fixture: ComponentFixture<Visita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Visita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Visita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
