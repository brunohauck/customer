import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addcustomers',
  templateUrl: './addcustomers.component.html',
  styleUrls: ['./addcustomers.component.css']
})
export class AddcustomersComponent implements OnInit {
  customer: Customer;
  title: String;
  constructor(
    private service: CustomerService, 
    private routeAct: ActivatedRoute) { 
    this.customer = new Customer(null,null,null,null,null,null,null,null)
    this.customer.id = routeAct.snapshot.params['id'];
    this.title = 'Add';
  }
  ngOnInit() {
    if(this.customer.id){
      this.title = 'Edit';
      this.customer = JSON.parse(localStorage.getItem('customer'));
    }
  }
  
  getCustomerDataById(){
    console.log(this.customer)
    this.service.getCustomerById(this.customer.id)
    .subscribe(customer => { 
      console.log(customer) 
    },
      err => {
        console.log(err);
      }
    );
  }
  submitCustomerForm(){
    if(this.customer.id){
      this.service.editCustomer(this.customer)
      .subscribe(response => { 
        console.log(response) 
      },
        err => {
          console.log(err);
        }
      );
    }else{
      this.service.addCustomer(this.customer)
      .subscribe(response => { 
        console.log(response) 
      },
        err => {
          console.log(err);
        }
      );
    }
  }
}
