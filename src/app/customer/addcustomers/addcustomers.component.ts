import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-addcustomers',
  templateUrl: './addcustomers.component.html',
  styleUrls: ['./addcustomers.component.css']
})
export class AddcustomersComponent implements OnInit {
  customer: Customer;
  customerForm: FormGroup;
  title: String;
  id: number;
  isLoadingResults = false;
  constructor(
    private service: CustomerService, 
    private routeAct: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { 
    
    this.id = routeAct.snapshot.params['id'];
    this.title = 'Add';
  }
  ngOnInit() {

    if(this.id){
      this.title = 'Edit';
      this.customer = JSON.parse(localStorage.getItem('customer'));
      this.customerForm = this.formBuilder.group({
        'name' : [this.customer.name, Validators.required],
        'email' : [this.customer.email, Validators.required],
        'phone' : [this.customer.phone, Validators.required],
        'address' : [this.customer.address, Validators.required],
        'city' : [this.customer.city, Validators.required],
        'state' : [this.customer.state, Validators.required],
        'zipcode' : [this.customer.zipcode, Validators.required]
      });
    }else{
      this.customerForm = this.formBuilder.group({
        'name' : [null, Validators.required],
        'email' : [null, Validators.required],
        'phone' : [null, Validators.required],
        'address' : [null, Validators.required],
        'city' : [null, Validators.required],
        'state' : [null, Validators.required],
        'zipcode' : [null, Validators.required]
      });
    }
  }

  submitCustomerForm(form:NgForm){
    this.isLoadingResults = true;
    this.customer = this.customerForm.value;
    if(this.id){
      this.customer.id = this.id;
      this.service.editCustomer(this.customer)
      .subscribe(response => { 
        this.isLoadingResults = false;
        this.router.navigate(['/listcustomer']);
      },
        err => {
          this.isLoadingResults = false;
          console.log(err);
        }
      );
    }else{
      this.service.addCustomer(this.customer)
      .subscribe(response => { 
        console.log(response) 
        this.isLoadingResults = false;
        this.router.navigate(['/listcustomer']);
      },
        err => {
          this.isLoadingResults = false;
          console.log(err);
        }
      );
    }
  }
}
