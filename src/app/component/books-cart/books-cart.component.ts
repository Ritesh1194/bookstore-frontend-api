import { Component, OnInit, ViewChild } from "@angular/core";
import { Order } from "src/app/shared/model/order.model";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import {
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatDialog,
} from "@angular/material";
import { CartServiceService } from "src/app/shared/service/cart-service.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Costomer } from "src/app/shared/model/costomer.model";
import { UserLoginComponent } from "../authentication/user-login/user-login.component";
import { UserService } from "src/app/shared/service/user.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-books-cart",
  templateUrl: "./books-cart.component.html",
  styleUrls: ["./books-cart.component.scss"],
})
export class BooksCartComponent implements OnInit {
  orders;
  finalAmount: number;
  orderList: MatTableDataSource<any>;
  size: number;
  page = 1;
  cosForm = false;
  openSummery = false;
  quantity = 1;
  currentpage = "cart";
  customerForm: FormGroup;
  isCartEmpty = false;
  cusomerDetails = new Costomer();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ["bookName", "price", "quantity", "total"];
  constructor(
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private cartService: CartServiceService,
    private userservice: UserService,
    private route: Router,
    private titleService: Title
  ) {
    this.setTitle("BookStore UserCart");
    this.cartService.autoRefresh$.subscribe(() => {
      this.getOrderList();
      this.orderList.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      customerName: ["", Validators.required],
      contact: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      pinCode: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      locality: [""],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: [""],
      landMark: ["", [Validators.required]],
      type: ["", Validators.required],
    });
    this.cartService.autoRefresh$.subscribe(() => {
      this.getOrderList();
      this.orderList.paginator = this.paginator;
    });
    this.getOrderList();
    this.setBudgetTotal();
  }

  get f() {
    return this.customerForm.controls;
  }

  getOrderList() {
    this.cartService.getCartList().subscribe((message) => {
      this.orders = message.orders;

      this.size = this.orders.length;
      if (this.orders.length == 0) {
        console.log("cart empty");
        this.isCartEmpty = true;
      }
      console.log(message.orders.length);
      this.orderList = new MatTableDataSource(this.orders);
      const price = this.orders.map((i) => i.total);
      const total = price.reduce((a, b) => a + b, 0);
      this.finalAmount = total;
    });
  }
  removeCartBook(bookId) {
    this.cartService.removeFromeBag(bookId).subscribe((message) => {
      sessionStorage.removeItem(bookId);
      this.matSnackBar.open("Book Removed From Cart", "OK", {
        duration: 4000,
      });
    });
  }
  increaseQuantity(order) {
    console.log(order);

    this.orders.forEach((fetchedBook) => {
      if (fetchedBook.bookId == order.bookId) {
        order.quantity = order.quantity + 1;
      }
    });

    this.cartService.updateOrderQuantity(order).subscribe(
      (message) => {
        console.log(message);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  decreseQuantity(order) {
    console.log(order);
    if (order.quantity > 0) {
      this.orders.forEach((fetchedBook) => {
        if (fetchedBook.bookId == order.bookId) {
          order.quantity = order.quantity - 1;
          console.log("quantity updated", order.quantity);
        }
      });

      this.cartService.updateOrderQuantity(order).subscribe(
        (message) => {
          console.log(message);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cartService.removeFromeBag(order.bookId).subscribe((message) => {
        this.matSnackBar.open("Book Removed From Cart", "OK", {
          duration: 4000,
        });
      });
    }
  }
  addCustomerInfo() {
    this.openSummery = true;
    this.userservice
      .addAddress(this.customerForm.value)
      .subscribe((message) => {
        this.matSnackBar.open("Address Added Successfully", "OK", {
          duration: 4000,
        });
      });
  }
  openCustomerDeatilsForm() {
    let currentPage = "cart";
    if (localStorage.isLogin == undefined && localStorage.isLogin == null) {
      this.cosForm = false;
      this.route.navigate(["/login"]);
    } else {
      this.cosForm = true;
    }
  }

  onclickSubmitCustomer() {
    this.cusomerDetails.customerName = this.customerForm.controls.customerName.value;
    this.cusomerDetails.contact = this.customerForm.controls.contact.value;
    this.cusomerDetails.pinCode = this.customerForm.controls.pinCode.value;
    this.cusomerDetails.locality = this.customerForm.controls.locality.value;
    this.cusomerDetails.city = this.customerForm.controls.city.value;
    this.cusomerDetails.landMark = this.customerForm.controls.landMark.value;
    this.cusomerDetails.address = this.customerForm.controls.address.value;
    console.log(this.cusomerDetails);
    this.setCustomerDetails();
    this.route.navigate(["greeting"]);
    this.cartService.confirmOrder(this.orders).subscribe((message) => {
      this.matSnackBar.open("Order Placed Successfully", "OK", {
        duration: 4000,
      });
    });
  }
  setCustomerDetails() {
    this.cartService.setCustomerDetails(this.cusomerDetails);
  }
  setBudgetTotal() {
    this.cartService.setBudgetTotal(this.orders.size());
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
