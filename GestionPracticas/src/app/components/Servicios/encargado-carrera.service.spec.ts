import { TestBed } from '@angular/core/testing';

import { EncargadoCarreraService } from './encargado-carrera.service';

describe('EncargadoCarreraService', () => {
  let service: EncargadoCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncargadoCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
