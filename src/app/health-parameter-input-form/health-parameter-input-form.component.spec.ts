import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthParameterInputFormComponent } from './health-parameter-input-form.component';

describe('HealthParameterInputFormComponent', () => {
  let component: HealthParameterInputFormComponent;
  let fixture: ComponentFixture<HealthParameterInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthParameterInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthParameterInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
