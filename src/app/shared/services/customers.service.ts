import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly URL: string = `http://localhost:3000/customers`

  constructor(private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<any> {
    return this.httpClient.get<Customer[]>(this.URL);
  }

  public getCustomer(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.URL}/${id}`);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.URL}`, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.URL}/${customer.id}`, customer);
  }

  public deleteCustomer(customerId: string): Observable<any> {
    return this.httpClient.delete(`${this.URL}/${customerId}`);
  }
}
