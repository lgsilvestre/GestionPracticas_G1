import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProcesoCarreraComponent } from './editar-proceso-carrera.component';

describe('EditarProcesoCarreraComponent', () => {
  let component: EditarProcesoCarreraComponent;
  let fixture: ComponentFixture<EditarProcesoCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProcesoCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProcesoCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
