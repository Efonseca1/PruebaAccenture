import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionCreditoComponent } from './aprobacion-credito.component';

describe('AprobacionCreditoComponent', () => {
  let component: AprobacionCreditoComponent;
  let fixture: ComponentFixture<AprobacionCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
