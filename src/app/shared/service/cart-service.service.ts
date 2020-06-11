import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  private _autoRefresh$ = new Subject();
  private customerDetails = new Subject<any>();
  private setbugetTotal = new Subject<any>();

  get autoRefresh$() {
    return this._autoRefresh$;
  }
  constructor(private http: HttpClient, private httpservice: HttpService) {}

  addToBag(id, quantity): Observable<any> {
    if (localStorage.isLogin == undefined && localStorage.isLogin == null) {
      return this.httpservice
        .postWithoutHeader(
          `${environment.cartApiUrl}/${environment.addToBag}/${id}?qty=${quantity}&userId=${sessionStorage.userId}`,
          {}
        )
        .pipe(
          tap(() => {
            this._autoRefresh$.next();
          })
        );
    } else {
      return this.httpservice
        .post(
          `${environment.cartApiUrl}/${environment.addToCartWithUser}/${id}?qty=${quantity}`,
          {},
          { headers: new HttpHeaders().set("token", localStorage.token) }
        )
        .pipe(
          tap(() => {
            this._autoRefresh$.next();
          })
        );
    }
  }
  removeFromeBag(id): Observable<any> {
    return this.httpservice
      .deleteWithoutToken(`${environment.cartApiUrl}/${id}`)
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  getCartList(): Observable<any> {
    if (localStorage.isLogin === undefined && localStorage.isLogin == null) {
      return this.httpservice.getWithoutHeader(
        `${environment.cartApiUrl}/${environment.cartList}?userId=${sessionStorage.userId}`
      );
    } else {
      return this.httpservice.get(
        `${environment.cartApiUrl}/${environment.userCartList}`,
        { headers: new HttpHeaders().set("token", localStorage.token) }
      );
    }
  }
  updateOrderQuantity(order): Observable<any> {
    return this.httpservice
      .putWithOutToken(
        `${environment.cartApiUrl}/${environment.updateQuantity}`,
        order
      )
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }
  confirmOrder(order): Observable<any> {
    console.log(order);
    return this.httpservice
      .put(`${environment.cartApiUrl}/${environment.confirmOrder}`, order, {
        headers: new HttpHeaders().set("token", localStorage.token),
      })
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  addToWishlist(id): Observable<any> {
    if (localStorage.isLogin == undefined && localStorage.isLogin == null) {
      return this.httpservice
        .postWithoutHeader(
          `${environment.wishlistApiUrl}/${environment.addToWishlist}${id}?&userId=${sessionStorage.userId}`,
          {}
        )
        .pipe(
          tap(() => {
            this._autoRefresh$.next();
          })
        );
    } else {
      return this.httpservice
        .post(
          `${environment.wishlistApiUrl}/${environment.addToWishlistWithUser}/${id}`,
          {},
          { headers: new HttpHeaders().set("token", localStorage.token) }
        )
        .pipe(
          tap(() => {
            this._autoRefresh$.next();
          })
        );
    }
  }

  removeFromWishlist(id): Observable<any> {
    if (localStorage.isLogin == undefined && localStorage.isLogin == null) {
      return this.httpservice
        .delete(
          `${environment.wishlistApiUrl}/${environment.deleteWishlist}${id}`,
          { headers: new HttpHeaders().set("userId", sessionStorage.userId) }
        )
        .pipe(
          tap(() => {
            this._autoRefresh$.next();
          })
        );
    } else {
      return this.httpservice
        .delete(
          `${environment.wishlistApiUrl}/${environment.deleteUserWishlist}/${id}?token=${localStorage.token}`,
          { headers: new HttpHeaders().set("token", localStorage.token) }
        )
        .pipe(
          tap(() => {
            this._autoRefresh$.next();
          })
        );
    }
  }

  setCustomerDetails(message: any) {
    this.customerDetails.next({ customer: message });
  }
  getCustomerDetails(): Observable<any> {
    return this.customerDetails.asObservable();
  }
  setBudgetTotal(message: any) {
    return this.setbugetTotal.next({ total: message });
  }
  getBudgetTotal(): Observable<any> {
    return this.setbugetTotal.asObservable();
  }

  /**
   * getAllOrderedBook
   */
  public getUsersOrdersList(): Observable<any> {
    console.log("#service reached get orders operation started.");
    return this.httpservice.get(
      `${environment.cartApiUrl}/${environment.allOrders}`,
      {
        headers: new HttpHeaders().set("token", localStorage.token),
      }
    );
  }
}
