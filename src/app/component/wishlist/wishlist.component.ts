import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { BookService } from "src/app/shared/service/book.service";
import { UserService } from "src/app/shared/service/user.service";
import { CartServiceService } from "src/app/shared/service/cart-service.service";
import { AddbookComponent } from "../addbook/addbook.component";
import { UploadBookimageComponent } from "../addbook/upload-bookimage/upload-bookimage.component";
import { UpdateBookComponent } from "../update-book/update-book.component";
import { Title } from "@angular/platform-browser";
import { error } from "util";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
})
export class WishlistComponent implements OnInit {
  // overriden properties of ngx paginatore
  public responsive: boolean = true;
  public autoHide: boolean = false;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public labels: any = {
    previousLabel: " < ",
    nextLabel: " > ",
  };

  wishlist: any;
  size: number;
  id: any;
  bookSearch: any;
  page: number = 1;
  budgetTotal;
  value: any = [];
  constructor(
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private bookService: BookService,
    private userService: UserService,
    private cartService: CartServiceService,
    private titleService: Title
  ) {
    this.setTitle("Wislist");
    this.userService.getQueryParam().subscribe((message) => {
      this.id = message.id;
      this.getAllWishlist();
    });
    this.cartService.autoRefresh$.subscribe(() => {
      this.getAllWishlist();
    });
    this.setBudgetTotal();
    this.getCartItems();
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      this.value[sessionStorage.getItem(key)] = sessionStorage.getItem(key);
    }
  }

  ngOnInit() {
    this.bookService.autoRefresh$.subscribe(() => {
      this.getAllWishlist();
    });
    this.getAllWishlist();
  }

  getAllWishlist() {
    this.bookService.getWishlist().subscribe((message) => {
      console.log(message);
      this.wishlist = message.data;
      this.size = this.wishlist.length;
    });

    this.getSearchBookData();
  }

  addToBag(bookId, quantity) {
    // this.toggle = !this.toggle;
    this.cartService.addToBag(bookId, 1).subscribe(
      (message) => {
        sessionStorage.setItem(bookId, bookId);
        this.value[bookId] = bookId;
        this.matSnackBar.open("Book Added to Bag SuccessFully", "OK", {
          duration: 4000,
        });
        this.setBudgetTotal();
        this.removeWishlist(bookId);
      },
      (error: any) => {
        this.matSnackBar.open(error.error.error, "OK", {
          duration: 4000,
        });
      }
    );
  }

  getSearchBookData() {
    this.bookService.getSearchBookData().subscribe((message) => {
      this.bookSearch = message.books;
    });
  }

  removeWishlist(bookId) {
    this.cartService.removeFromWishlist(bookId).subscribe((message) => {
      this.matSnackBar.open("Removed From Wishlist", "OK", {
        duration: 4000,
      });
    });
  }

  getCartItems() {
    this.cartService.getCartList().subscribe((message) => {
      this.budgetTotal = message.orders.length;
    });
  }
  setBudgetTotal() {
    this.getCartItems();
    this.cartService.setBudgetTotal(this.budgetTotal);
  }
  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
