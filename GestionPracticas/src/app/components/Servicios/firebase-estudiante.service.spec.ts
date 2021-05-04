import { TestBed } from '@angular/core/testing';

import { FirebaseEstudianteService } from './firebase-estudiante.service';

describe('FirebaseEstudianteService', () => {
  let service: FirebaseEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
