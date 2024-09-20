import { TestBed } from '@angular/core/testing';

import { HoursManagementService } from './hours-management.service';

describe('HoursManagementService', () => {
  let service: HoursManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoursManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
