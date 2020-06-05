import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpEventType,
} from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Book } from "../model/book.model";
import { tap, map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private _autoRefresh$ = new Subject();
  private searchBookData = new Subject<any>();
  private httpOtions = {
    headers: new HttpHeaders({ "content-type": "application/json" }),
  };

  get autoRefresh$() {
    return this._autoRefresh$;
  }
  constructor(private http: HttpClient, private httpservice: HttpService) {}
  getBookList(): Observable<any> {
    return this.httpservice.getWithoutHeader(
      `${environment.bookApiUrl}/${environment.getBooksList}`
    );
  }

  getWishlist(): Observable<any> {
    if (localStorage.isLogin === undefined && localStorage.isLogin == null) {
      return this.httpservice.getWithoutHeader(
        `${environment.wishlistApiUrl}/${environment.getWishList}?userId=${sessionStorage.userId}`
      );
    } else {
      return this.httpservice.get(
        `${environment.wishlistApiUrl}/${environment.getUserWishlist}`,
        { headers: new HttpHeaders().set("token", localStorage.token) }
      );
    }
  }

  getSellerBookList(): Observable<any> {
    return this.httpservice.get(
      `${environment.bookApiUrl}/${environment.getSellerBookList}`,
      {
        headers: new HttpHeaders().set("token", localStorage.token),
      }
    );
  }

  addBook(book: Book): Observable<any> {
    return this.httpservice
      .post(`${environment.bookApiUrl}/${environment.addbook}`, book, {
        headers: new HttpHeaders().set("token", localStorage.token),
      })
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  uploadBookImage(bookId, imageData, formData): Observable<any> {
    return this.httpservice
      .post(
        `${environment.bookApiUrl}/${environment.addBookImage}?bookId=${bookId}`,
        formData,
        {
          headers: new HttpHeaders().set("token", localStorage.token),
          reportProgress: true,
          observe: "events",
        }
      )
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return this.apiResponse(event);
      default:
    }
  }

  private apiResponse(event) {
    return event.body;
  }

  private fileUploadProgress(event) {
    const percentageDone = Math.round((100 * event.loaded) / event.total);
    return { status: "progress", message: percentageDone };
  }

  deleteBook(bookId): Observable<any> {
    return this.httpservice
      .delete(`${environment.bookApiUrl}/${bookId}`, {
        headers: new HttpHeaders().set("token", localStorage.token),
      })
      .pipe(
        tap(() => {
          this._autoRefresh$.next();
        })
      );
  }

  setSearchBookData(message: any) {
    console.log("set service", message);
    return this.searchBookData.next({ books: message });
  }
  getSearchBookData(): Observable<any> {
    console.log("get service");
    return this.searchBookData.asObservable();
  }
}
