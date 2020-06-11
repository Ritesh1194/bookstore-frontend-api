import { PlacedOrder } from "./../../shared/model/placed-order.model";
import { Component, OnInit } from "@angular/core";
import { CartServiceService } from "src/app/shared/service/cart-service.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  rating: number;
  placedOrders: PlacedOrder[];
  isRated: boolean = false;
  constructor(
    private cartService: CartServiceService,
    private matSnackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.cartService.autoRefresh$.subscribe(() => this.getAllOrderedBooks());
    this.getAllOrderedBooks();
  }
  /**
   * name
   */
  public getAllOrderedBooks() {
    return this.cartService.getUsersOrdersList().subscribe(
      (response: any) => {
        console.log("response list : ", response);
        this.placedOrders = response.orders;
        console.log("placed orders : ", this.placedOrders);
      },
      (errors: any) => {
        console.log("errors : ", errors);
      }
    );
  }
}
