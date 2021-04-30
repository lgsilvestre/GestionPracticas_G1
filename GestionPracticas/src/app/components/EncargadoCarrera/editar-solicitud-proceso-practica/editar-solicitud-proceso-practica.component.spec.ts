import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolicitudProcesoPracticaComponent } from './editar-solicitud-proceso-practica.component';

describe('EditarSolicitudProcesoPracticaComponent', () => {
  let component: EditarSolicitudProcesoPracticaComponent;
  let fixture: ComponentFixture<EditarSolicitudProcesoPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSolicitudProcesoPracticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudProcesoPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
