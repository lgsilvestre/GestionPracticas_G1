import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSolicitudEncCarreraComponent } from './grafico-solicitud-enc-carrera.component';

describe('GraficoSolicitudEncCarreraComponent', () => {
  let component: GraficoSolicitudEncCarreraComponent;
  let fixture: ComponentFixture<GraficoSolicitudEncCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoSolicitudEncCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoSolicitudEncCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
