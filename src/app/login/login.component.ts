import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  login(result: NgForm, submit) {
    // submit如果不给类型，就是any类型，果然typescript是为了帮助编程的
    console.log(result.value, result.valid, submit);
  }
}
