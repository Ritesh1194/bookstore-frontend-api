import { Component, OnInit } from "@angular/core";
import { User } from "../../../shared/model/user.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { UserService } from "../../../shared/service/user.service";
import { Router } from "@angular/router";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { NgxSpinnerService } from "ngx-spinner";
import { MatchPassword } from "../../../util/password-match";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  user: User = new User();
  showSpinner = false;
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  hide2 = true;
  showMsg = false;

  // tslint:disable-next-line:max-line-length
  constructor(
    private matSnackBar: MatSnackBar,
    private userservice: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private titleService: Title
  ) {
    this.setTitle("BookStore-SignUp");
  }
  ngOnInit() {
    this.spinner.show();
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", [Validators.required]],
        lastName: [""],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-z0-9.%-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
          ],
        ],
        cnfpassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16),
          ],
        ],
        phNo: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        userName: ["", [Validators.required]],
        gender: ["", [Validators.required]],
      },
      {
        validator: MatchPassword("password", "cnfpassword"),
      }
    );
  }

  onRegisterSubmit() {
    this.showSpinner = true;
    this.userservice.registerUser(this.registerForm.value).subscribe(
      (user) => {
        this.router.navigate([""]);
        this.showMsg = true;
        this.submitted = true;
        this.matSnackBar.open(
          "Registration Successfull Please Verify Account Before Login",
          "ok",
          { duration: 4000 }
        );
        this.showSpinner = false;
      },
      (error: any) => {
        this.showSpinner = false;
        this.matSnackBar.open(error.error.error, "ok", { duration: 4000 });
        console.log(error);
      }
    );
    if (this.registerForm.invalid) {
      return;
    }
  }

  onSellerRegisterSubmit() {
    this.showSpinner = true;
    this.userservice.registerSeller(this.registerForm.value).subscribe(
      (user) => {
        this.router.navigate([""]);
        this.showMsg = true;
        this.submitted = true;
        this.matSnackBar.open(
          "Registration Successfull Please Verify Account Before Login",
          "ok",
          { duration: 4000 }
        );
        this.showSpinner = false;
      },
      (error: any) => {
        this.showSpinner = false;
        this.matSnackBar.open(error.error.error, "ok", { duration: 4000 });
        console.log(error);
      }
    );
    if (this.registerForm.invalid) {
      return;
    }
  }
  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  get f() {
    return this.registerForm.controls;
  }
}
