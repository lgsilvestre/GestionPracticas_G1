import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminGeneralComponent } from './menu-admin-general.component';

describe('MenuAdminGeneralComponent', () => {
  let component: MenuAdminGeneralComponent;
  let fixture: ComponentFixture<MenuAdminGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAdminGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdminGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
