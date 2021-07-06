import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createSpyFromClass } from 'jasmine-auto-spies';
import { CustomersService } from '../shared/services/customers.service';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersComponent ],
      providers: [
        { provide: CustomersService, useValue: createSpyFromClass(CustomersService)}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
