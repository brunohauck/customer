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
    // This is not the ideal way to pass information to another component.
    // There are other forms such as Inputs, Redux and Services, but due to lack of time I decided to use this technique.
    localStorage.setItem('customer', JSON.stringify(customer));
    this.router.navigate(['editcustomer', customer.id]);
  }
  deleteCustomerClick(customer: Customer){
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
