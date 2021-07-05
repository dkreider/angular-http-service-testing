import { CustomersService } from './../../shared/services/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerEditForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  });

  constructor(
    private customerService: CustomersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.loadCustomer(id);
  }

  loadCustomer(id: string): void {
    this.customerService.getCustomer(id).subscribe((customer) => this.customerEditForm.patchValue(customer));
  }

}
