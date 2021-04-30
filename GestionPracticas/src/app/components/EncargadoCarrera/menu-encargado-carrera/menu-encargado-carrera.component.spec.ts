import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEncargadoCarreraComponent } from './menu-encargado-carrera.component';

describe('MenuEncargadoCarreraComponent', () => {
  let component: MenuEncargadoCarreraComponent;
  let fixture: ComponentFixture<MenuEncargadoCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEncargadoCarreraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEncargadoCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
