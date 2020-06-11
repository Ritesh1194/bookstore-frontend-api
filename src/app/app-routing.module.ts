import { OrdersComponent } from "./component/orders/orders.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./component/authentication/registration/registration.component";
import { UserLoginComponent } from "./component/authentication/user-login/user-login.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DisplaybooksComponent } from "./component/displaybooks/displaybooks.component";
import { ActivateUserComponent } from "./component/authentication/activate-user/activate-user.component";
import { BooksCartComponent } from "./component/books-cart/books-cart.component";
import { OrderplaceGreentingComponent } from "./component/orderplace-greenting/orderplace-greenting.component";
import { AuthGuard } from "./component/authentication/auth.guard";
import { WishlistComponent } from "./component/wishlist/wishlist.component";
import { ForgotpasswordComponent } from "./component/authentication/forgotpassword/forgotpassword.component";
import { ResetPasswordComponent } from "./component/authentication/reset-password/reset-password.component";
import { PageNotFoundComponent } from "./component/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard/user", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "wishlist", component: WishlistComponent },
  { path: "forgotpassword", component: ForgotpasswordComponent },
  { path: "reset-password/:token", component: ResetPasswordComponent },
  { path: "login", component: UserLoginComponent },
  { path: "orders", component: OrdersComponent },
  {
    path: "dashboard/:id",
    component: DashboardComponent,
    children: [
      { path: "", component: DisplaybooksComponent },
      { path: "cart", component: BooksCartComponent },
    ],
  },
  { path: "activate/:token", component: ActivateUserComponent },
  { path: "cart", component: BooksCartComponent },
  {
    path: "greeting",
    component: OrderplaceGreentingComponent,
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
