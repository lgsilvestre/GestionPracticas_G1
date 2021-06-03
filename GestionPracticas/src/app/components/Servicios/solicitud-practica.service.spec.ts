import { TestBed } from '@angular/core/testing';

import { SolicitudPracticaService } from './solicitud-practica.service';

describe('SolicitudPracticaService', () => {
  let service: SolicitudPracticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudPracticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
