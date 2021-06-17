import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirFechasImportantesComponent } from './definir-fechas-importantes.component';

describe('DefinirFechasImportantesComponent', () => {
  let component: DefinirFechasImportantesComponent;
  let fixture: ComponentFixture<DefinirFechasImportantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefinirFechasImportantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirFechasImportantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
