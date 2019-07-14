import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from '../model/customer';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  BASE_URL: string = 'https://tidy-api-test.herokuapp.com/';
  constructor(private http: HttpClient) { }

  /**  POST  customer api  ADD Customer Function  */
  addCustomer(customer: Customer): Observable<Customer> {
    var url: string = this.BASE_URL + 'api/v1/customer_data';
    return this.http.post<Customer>(url, customer, httpOptions)
      .pipe(
        tap((retorno: Customer) =>
          console.log("Customer Add"),
        ),
        catchError(
          this.handleError<Customer>('add')
        )
      );
  }

  /**  PUT customer api EDIT Customer Function  */
  editCustomer(customer: Customer): Observable<Customer> {
    var url: string = this.BASE_URL + 'api/v1/customer_data/' + customer.id;;
    return this.http.put<Customer>(url, customer, httpOptions)
      .pipe(
        tap((retorno: Customer) =>
          console.log("Customer Add"),
        ),
        catchError(
          this.handleError<Customer>('addHero')
        )
      );
  }
  /**  GET customer api Gell All Custmoer Function  */
  getCustomers(): Observable<Customer[]> {
    var url: string = this.BASE_URL + 'api/v1/customer_data';
    return this.http.get<Customer[]>(url)
      .pipe(
        tap(todos => 
          console.log('Get Customer From API')
        ),
        catchError(this.handleError('getCustomers', []))
      );
  }


  /** DELETE: delete customer Function*/
  deleteCustomer(customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    var url: string = this.BASE_URL + 'api/v1/customer_data/' + id;
    return this.http.delete<Customer>(url, httpOptions)
      .pipe(
        tap(_ => 
          console.log(`deleted customer id=${id}`)
          ),
        catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
