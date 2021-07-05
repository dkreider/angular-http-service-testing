import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  URL: string = `http://localhost:3000/customers`

  constructor(private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${URL}`);
  }

  public getCustomer(id: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`${URL}/${id}`);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${URL}`, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(`${URL}`, customer);
  }
}
