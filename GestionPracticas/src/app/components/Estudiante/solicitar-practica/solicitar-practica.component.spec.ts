import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPracticaComponent } from './solicitar-practica.component';

describe('SolicitarPracticaComponent', () => {
  let component: SolicitarPracticaComponent;
  let fixture: ComponentFixture<SolicitarPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarPracticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
