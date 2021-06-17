import { TestBed } from '@angular/core/testing';

import { GestionCarreraService } from './gestion-carrera.service';

describe('GestionCarreraService', () => {
  let service: GestionCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
