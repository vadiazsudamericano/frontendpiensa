import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHerramienta } from './registro-herramienta';

describe('RegistroHerramienta', () => {
  let component: RegistroHerramienta;
  let fixture: ComponentFixture<RegistroHerramienta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroHerramienta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroHerramienta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
