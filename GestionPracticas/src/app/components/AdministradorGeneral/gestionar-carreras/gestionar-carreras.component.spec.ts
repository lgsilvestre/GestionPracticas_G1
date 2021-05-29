import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCarrerasComponent } from './gestionar-carreras.component';

describe('GestionarCarrerasComponent', () => {
  let component: GestionarCarrerasComponent;
  let fixture: ComponentFixture<GestionarCarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCarrerasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
