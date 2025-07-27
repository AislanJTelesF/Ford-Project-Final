import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacaoResultsDialog } from './comparacao-results-dialog';

describe('ComparacaoResultsDialog', () => {
  let component: ComparacaoResultsDialog;
  let fixture: ComponentFixture<ComparacaoResultsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparacaoResultsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparacaoResultsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
