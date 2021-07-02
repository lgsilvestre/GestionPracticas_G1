import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuentaAdministradorGeneralComponent } from './crear-cuenta-administrador-general.component';

describe('CrearCuentaAdministradorGeneralComponent', () => {
  let component: CrearCuentaAdministradorGeneralComponent;
  let fixture: ComponentFixture<CrearCuentaAdministradorGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCuentaAdministradorGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCuentaAdministradorGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
