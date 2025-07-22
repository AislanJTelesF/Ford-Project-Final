import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacaoComponent } from './comparacao';

describe('Comparacao', () => {
  let component: ComparacaoComponent;
  let fixture: ComponentFixture<ComparacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
