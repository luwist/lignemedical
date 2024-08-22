import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isDoctorGuard } from './is-doctor.guard';

describe('isDoctorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isDoctorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
