import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPageRegisterGuard } from './auth-page-register.guard';

describe('AuthPageRegisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPageRegisterGuard]
    });
  });

  it('should ...', inject([AuthPageRegisterGuard], (guard: AuthPageRegisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
