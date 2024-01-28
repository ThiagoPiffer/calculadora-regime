import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraRegimeComponent } from './calculadora-regime.component';

describe('CalculadoraRegimeComponent', () => {
  let component: CalculadoraRegimeComponent;
  let fixture: ComponentFixture<CalculadoraRegimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculadoraRegimeComponent]
    });
    fixture = TestBed.createComponent(CalculadoraRegimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
