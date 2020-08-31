import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleExpensesComponent } from './settle-expenses.component';

describe('SettleExpensesComponent', () => {
  let component: SettleExpensesComponent;
  let fixture: ComponentFixture<SettleExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
