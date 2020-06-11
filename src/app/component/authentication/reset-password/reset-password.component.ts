import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/model/user.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { UserService } from "src/app/shared/service/user.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  user: User = new User();
  resetpasswordForm: FormGroup;
  token: string;
  showSpinner = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private route2: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get("token");
    }),
      (this.resetpasswordForm = this.formBuilder.group({
        password: [this.user.password, [Validators.required]],
      }));
  }

  onSubmit() {
    console.log("---------------------------------------");
    this.showSpinner = true;
    this.token = this.route.snapshot.paramMap.get("token");
    this.userservice
      .resetPassword(this.token, this.resetpasswordForm.value)
      .subscribe(
        (user) => {
          console.log(user);
          this.route2.navigate(["/login"]);
          this.matSnackBar.open("Your New Password Updated", "ok", {
            duration: 4000,
          });
        },
        (error: any) => {
          console.log(error);
          this.matSnackBar.open("Bad Crediatial Please try again.", "ok", {
            duration: 5000,
          });
        }
      );
    // alert(this.user.firstName + ' ' + this.user.email + ' ' + this.user.password);
  }
}
