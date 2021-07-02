import { TestBed } from '@angular/core/testing';

import { GestionEncargadosService } from './gestion-encargados.service';

describe('GestionEncargadosService', () => {
  let service: GestionEncargadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEncargadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
