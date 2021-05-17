import { TestBed } from '@angular/core/testing';

import { GestionAdminGeneralService } from './gestion-admin-general.service';

describe('GestionAdminGeneralService', () => {
  let service: GestionAdminGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAdminGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
