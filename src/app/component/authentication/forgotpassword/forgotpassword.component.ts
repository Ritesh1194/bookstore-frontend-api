import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/shared/model/user.model";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/service/user.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"],
})
export class ForgotpasswordComponent implements OnInit {
  user: User = new User();
  forgotpasswordForm: FormGroup;
  token: string;
  showSpinner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
    private matSnackBar: MatSnackBar,
    private route2: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.forgotpasswordForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required]],
    });
  }
  onSubmit() {
    this.showSpinner = true;

    console.log("---------------------------------------");
    this.userservice
      .forgotPasswordVerifyMail(this.forgotpasswordForm.controls["email"].value)
      .subscribe(
        (user) => {
          console.log(user);
          this.router.navigate(["/login"]);
          this.matSnackBar.open(
            "Reset Password Link Sent to Your Mail!!",
            "ok",
            { duration: 5000 }
          );
          this.showSpinner = false;
        },
        (error: any) => {
          console.log(error);
          this.matSnackBar.open("Invalid Email", "ok", { duration: 4000 });
          this.showSpinner = false;
        }
      );

    // alert(this.user.firstName + ' ' + this.user.email + ' ' + this.user.password);
  }
}

// this.showSpinner = true;

// console.log("---------------------------------------");
// // this.form.controls['your form control name'].value
// this.userservice
//   .forgotPasswordVerifyMail(this.forgotpasswordForm.controls["email"].value)
//   .subscribe(
//     (user) => {
//       console.log(user);
//       this.router.navigate(["/login"]);
//       this.matSnackBar.open("Reset Password Link Sent to Your Mail!!", "ok", {
//         duration: 5000,
//       });
//       this.showSpinner = false;
//     },
//     (error: any) => {
//       console.log(error);
//       this.matSnackBar.open("Invalid Email", "ok", { duration: 4000 });
//       this.showSpinner = false;
//     }
//   );
