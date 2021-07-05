import { CustomersService } from './../../shared/services/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerEditForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(
    private customerService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.loadCustomer(id);
  }

  loadCustomer(id: string): void {
    this.customerService.getCustomer(id).subscribe((customer) => this.customerEditForm.patchValue(customer));
  }

  saveCustomer(): void {
    let customer = this.customerEditForm.value as Customer;
    this.customerService.updateCustomer(customer).subscribe(() => this.router.navigate(['customers']));
  }

  deleteCustomer(): void {
    let customer = this.customerEditForm.value as Customer;
    this.customerService.deleteCustomer(customer.id).subscribe(() => this.router.navigate(['customers']));
  }

}
