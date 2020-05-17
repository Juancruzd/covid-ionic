import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPageTabsGuard } from './auth-page-tabs.guard';

describe('AuthPageTabsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPageTabsGuard]
    });
  });

  it('should ...', inject([AuthPageTabsGuard], (guard: AuthPageTabsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
