import { Component, OnInit } from "@angular/core";
import { CartServiceService } from "src/app/shared/service/cart-service.service";
import { Costomer } from "src/app/shared/model/costomer.model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-orderplace-greenting",
  templateUrl: "./orderplace-greenting.component.html",
  styleUrls: ["./orderplace-greenting.component.scss"],
})
export class OrderplaceGreentingComponent implements OnInit {
  customerDetails = new Costomer();
  constructor(
    private cartService: CartServiceService,
    private titleService: Title
  ) {
    this.setTitle("Thank You");
  }

  ngOnInit() {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.cartService.getCustomerDetails().subscribe((message) => {
      this.customerDetails = message.customer;
      console.log(this.customerDetails);
    });
  }
  onClickClear() {
    sessionStorage.clear();
  }
  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
