import { TestBed } from '@angular/core/testing';

import { Dashboard } from '../pages/dashboard/dashboard';

describe('Dashboard', () => {
  let service: Dashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dashboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
