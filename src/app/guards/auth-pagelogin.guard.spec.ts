import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPageloginGuard } from './auth-pagelogin.guard';

describe('AuthPageloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPageloginGuard]
    });
  });

  it('should ...', inject([AuthPageloginGuard], (guard: AuthPageloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
