import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinDataDialog } from './vin-data-dialog';

describe('VinDataDialog', () => {
  let component: VinDataDialog;
  let fixture: ComponentFixture<VinDataDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinDataDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinDataDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
