import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPracticaCarreraComponent } from './solicitud-practica-carrera.component';

describe('SolicitudPracticaCarreraComponent', () => {
  let component: SolicitudPracticaCarreraComponent;
  let fixture: ComponentFixture<SolicitudPracticaCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPracticaCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPracticaCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
