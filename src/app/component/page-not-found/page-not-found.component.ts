import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent implements OnInit {
  pageNotFoundErrorCode: number = 404;
  pageNotFoundErrorMessage: string = "The Page can't be found";

  constructor() {}

  ngOnInit() {}
}
