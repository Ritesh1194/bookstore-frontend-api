import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/shared/service/user.service";
import { BookService } from "src/app/shared/service/book.service";
import { CartServiceService } from "src/app/shared/service/cart-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  name: any;
  id: any;
  isUser = false;
  isSeller = false;
  bookName: string;
  totalItem;
  isbudget = false;
  isLogin = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private cartService: CartServiceService,
    private bookService: BookService
  ) {
    this.name = localStorage.firstName + "  " + localStorage.lastName;
    this.userService.getQueryParam().subscribe((message) => {
      this.id = message.id;
      if (this.id === "user") {
        this.isSeller = false;
        this.isUser = true;
      } else if (this.id === "seller") {
        this.isSeller = true;
      }
    });
    if (localStorage.isLogin !== undefined && localStorage.isLogin !== null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  ngOnInit() {
    this.getCartItems();
    this.getBudgetTotal();
  }

  onClickClear() {
    sessionStorage.clear();
    localStorage.clear();
    this.isLogin = false;
    this.router.navigate([""]);
  }

  bookSearch() {
    // console.log(this.bookName);
    this.bookService.setSearchBookData(this.bookName);
  }

  getBudgetTotal() {
    this.cartService.getBudgetTotal().subscribe((data) => {
      this.totalItem = data.total + 1;
      if (this.totalItem != null) {
        console.log("if condion");
        this.isbudget = true;
      }
    });
  }
  getCartItems() {
    console.log("getCartList");
    this.cartService.getCartList().subscribe((message) => {
      console.log("sss");
      if (message.orders.length > 0) {
        this.totalItem = message.orders.length;
      }
    });
  }
  refreshButton() {
    window.location.reload();
  }
}
