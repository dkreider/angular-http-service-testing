import { CustomersService } from './../shared/services/customers.service';
import { Customer } from './../shared/models/customer';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  $customers: Observable<Customer[]>;

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.$customers = this.customersService.getAllCustomers();
  }

}
