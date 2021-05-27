import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuentaEstudianteComponent } from './crear-cuenta-estudiante.component';

describe('CrearCuentaEstudianteComponent', () => {
  let component: CrearCuentaEstudianteComponent;
  let fixture: ComponentFixture<CrearCuentaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCuentaEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCuentaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
