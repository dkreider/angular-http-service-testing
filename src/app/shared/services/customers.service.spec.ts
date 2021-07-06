import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Customer } from '../models/customer';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let httpSpy: Spy<HttpClient>;
  let fakeCustomers: Customer[] = [
    {
      id: "1",
      name: "Fake Customer",
      email: "fake@fake.com"
    },
    {
      id: "2",
      name: "Fake Customer Two",
      email: "fake-two@fake.com"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    
    service = TestBed.inject(CustomersService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete an existing customer', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse ({
      status: 200
    }));

    service.deleteCustomer("1").subscribe(
      response => {
        expect(response.status).toEqual(200);
        done();
      },
      done.fail
    );
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

  it('should create a new customer', (done: DoneFn) => {
    
    var newCustomer = {
      name: "New Customer",
      email: "new@customer.com"
    } as Customer;

    httpSpy.post.and.nextWith(newCustomer);

    service.createCustomer(newCustomer).subscribe(
      customer => {
        expect(customer).toEqual(newCustomer);
        done();
      },
      done.fail
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should return an expected list of customers', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeCustomers);

    service.getAllCustomers().subscribe(
      customers => {
        expect(customers).toHaveSize(fakeCustomers.length);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return an expected customer given an existing customer id', (done: DoneFn) => {
    
    var customerId = "1";
    var expectedCustomer = fakeCustomers.find(c => c.id == customerId);

    httpSpy.get.and.nextWith(expectedCustomer);

    service.getCustomer(customerId).subscribe(
      customer => {
        expect(customer).toEqual(expectedCustomer);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should update a customer with given customer id', (done: DoneFn) => {
    
    var customer = fakeCustomers[0];
    customer.name = "Updated Customer";

    httpSpy.put.and.nextWith(customer);

    service.updateCustomer(customer).subscribe(
      customer => {
        expect(customer.name).toEqual("Updated Customer");
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should return a 404', (done: DoneFn) => {
    
    var customerId = "89776683";

    httpSpy.get.and.throwWith(new HttpErrorResponse({
          error: "404 - Not Found",
          status: 404
    }));

    service.getCustomer(customerId).subscribe(
      customer => {
        done.fail("Expected a 404");
      },
      error => {
        expect(error.status).toEqual(404);
        done();
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
