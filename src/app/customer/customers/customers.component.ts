import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  isLoadingResults = true;
  constructor(
    private service: CustomerService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getUsers();
  }
  ngAfterViewInit(){
    localStorage.clear();
  }
  getUsers(): void {
    this.service.getCustomers()
      .subscribe(
        customers => {
          this.isLoadingResults = false;
          this.customers = customers;
        },
        error => {
          console.log("OPS! Error")
        });
  }
  editCustmerClick(customer: Customer){
    localStorage.setItem('customer', JSON.stringify(customer));
    this.router.navigate(['editcustomer', customer.id]);
  }
  deleteCustomerClick(customer: Customer){
    console.log("Entrou no Delete")
    this.service.deleteCustomer(customer.id)
    .pipe(first())
    .subscribe(
      response => {
        console.log(response)
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
  }  
}
