import { TestBed } from '@angular/core/testing';

import { GestionarArchivosGeneralesService } from './gestionar-archivos-generales.service';

describe('GestionarArchivosGeneralesService', () => {
  let service: GestionarArchivosGeneralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarArchivosGeneralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
