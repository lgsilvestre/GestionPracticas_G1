import { TestBed } from '@angular/core/testing';

import { GestionEstudianteService } from './gestionEstudiante.service';

describe('GestionService', () => {
  let service: GestionEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
