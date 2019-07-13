import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  constructor(
    private service: CustomerService
  ) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.service.getCustomers()
      .subscribe(
        customers => {
          this.customers = customers;
        },
        error => {
          console.log("OPS! Error")
        });
  }
  editCustmerClick(customer: Customer){
  }
  deleteCustomerClick(customer: Customer){
    this.service.deleteCustomer(customer.id)
    .pipe(first())
    .subscribe(
      response =>  
        console.log(response),
      err => {
        console.log(err);
        //return this.error = "Erro de conexão!";
      }
    );
  }  
}
