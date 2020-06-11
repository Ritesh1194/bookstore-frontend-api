import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegistrationComponent } from "./component/authentication/registration/registration.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardTitle,
  MatSnackBar,
  MatSnackBarModule,
  MatOption,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatStepperModule,
  MatBadge,
  MatBadgeModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatListModule,
  MatGridListModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
} from "@angular/material";
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";
import { UserLoginComponent } from "./component/authentication/user-login/user-login.component";
import { ToolbarComponent } from "./component/toolbar/toolbar.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DisplaybooksComponent } from "./component/displaybooks/displaybooks.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddbookComponent } from "./component/addbook/addbook.component";
import { MatMenuModule } from "@angular/material/menu";
import { UpdateBookComponent } from "./component/update-book/update-book.component";
import { ActivateUserComponent } from "./component/authentication/activate-user/activate-user.component";
import { BooksCartComponent } from "./component/books-cart/books-cart.component";
import { UpdatePriceComponent } from "./component/update-book/update-price/update-price.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { UploadBookimageComponent } from "./component/addbook/upload-bookimage/upload-bookimage.component";
import { BookSearchPipe } from "./pipe/book-search.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { SortbypricePipe } from "./pipe/sortbyprice.pipe";
import { OrderplaceGreentingComponent } from "./component/orderplace-greenting/orderplace-greenting.component";
import { AuthGuard } from "./component/authentication/auth.guard";
import { WishlistComponent } from "./component/wishlist/wishlist.component";
import { OrdersComponent } from "./component/orders/orders.component";
import { RatingModule } from "ngx-rating";
import { ForgotpasswordComponent } from "./component/authentication/forgotpassword/forgotpassword.component";
import { ResetPasswordComponent } from "./component/authentication/reset-password/reset-password.component";
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UserLoginComponent,
    ToolbarComponent,
    DashboardComponent,
    DisplaybooksComponent,
    AddbookComponent,
    UpdateBookComponent,
    ActivateUserComponent,
    BooksCartComponent,
    UpdatePriceComponent,
    UploadBookimageComponent,
    BookSearchPipe,
    SortbypricePipe,
    OrderplaceGreentingComponent,
    WishlistComponent,
    OrdersComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatStepperModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RatingModule,
  ],
  entryComponents: [
    UserLoginComponent,
    AddbookComponent,
    UpdateBookComponent,
    UploadBookimageComponent,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
// tslint:disable-next-line: one-line
export class AppModule {}
