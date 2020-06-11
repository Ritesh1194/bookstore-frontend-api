import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private queryParam = new Subject<any>();

  private httpOtions = {
    headers: new HttpHeaders({ "content-type": "application/json" }),
  };
  constructor(private http: HttpClient, private httpservice: HttpService) {}

  registerUser(user: any): Observable<any> {
    console.log("User Email", user.email);
    return this.httpservice.post(
      `${environment.userApiUrl}/${environment.registerURL}`,
      user,
      this.httpOtions
    );
  }

  registerSeller(user: any): Observable<any> {
    return this.httpservice.post(
      `${environment.userApiUrl}/${environment.sellerRegister}`,
      user,
      this.httpOtions
    );
  }

  loginUser(user: any): Observable<any> {
    console.log("User Email", user.email, user.password);
    return this.httpservice.post(
      `${environment.userApiUrl}/${environment.userLoginUrl}/${user.email}`,
      user,
      { headers: new HttpHeaders().set("password", user.password) }
    );
  }

  loginAdmin(user: any): Observable<any> {
    return this.httpservice.post(
      `${environment.userApiUrl}/${environment.sellerLoginUrl}/${user.email}`,
      user,
      { headers: new HttpHeaders().set("password", user.password) }
    );
  }

  activateUser(user: any, token: string): Observable<any> {
    console.log("calling to.." + `${this.activateUser}/${token}`);
    return this.httpservice.put(
      `${environment.userApiUrl}/${environment.activateUser}/${token}`,
      user,
      { responseType: "text" }
    );
  }
  addAddress(address: any): Observable<any> {
    return this.httpservice.post(
      `${environment.userApiUrl}/${environment.addAddress}`,
      address,
      { headers: new HttpHeaders().set("token", localStorage.token) }
    );
  }
  setQueryParam(message: any) {
    this.queryParam.next({ id: message });
  }

  forgotPasswordVerifyMail(email) {
    return this.httpservice.getWithoutHeader(
      `${environment.userApiUrl}/${environment.forgotPassword}/${email}`
    );
  }

  resetPassword(token, user) {
    return this.httpservice.put(
      `${environment.userApiUrl}/${token}`,
      {},
      { headers: new HttpHeaders().set("password", user.password) }
    );
  }

  getQueryParam(): Observable<any> {
    return this.queryParam.asObservable();
  }

  isLoggedIn() {
    return !!sessionStorage.token;
  }
}
