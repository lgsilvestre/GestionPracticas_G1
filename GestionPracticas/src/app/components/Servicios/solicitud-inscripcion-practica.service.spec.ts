import { TestBed } from '@angular/core/testing';

import { SolicitudInscripcionPracticaService } from './solicitud-inscripcion-practica.service';

describe('SolicitudInscripcionPracticaService', () => {
  let service: SolicitudInscripcionPracticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudInscripcionPracticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
