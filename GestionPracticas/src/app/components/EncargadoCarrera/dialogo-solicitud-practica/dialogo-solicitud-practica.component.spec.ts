import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSolicitudPracticaComponent } from './dialogo-solicitud-practica.component';

describe('DialogoSolicitudPracticaComponent', () => {
  let component: DialogoSolicitudPracticaComponent;
  let fixture: ComponentFixture<DialogoSolicitudPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoSolicitudPracticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoSolicitudPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
