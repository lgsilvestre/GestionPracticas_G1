import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoCircularEncCarreraComponent } from './grafico-circular-enc-carrera.component';

describe('GraficoCircularEncCarreraComponent', () => {
  let component: GraficoCircularEncCarreraComponent;
  let fixture: ComponentFixture<GraficoCircularEncCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoCircularEncCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoCircularEncCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
