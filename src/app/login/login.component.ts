import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  onEmailChange(change) {
    console.log(change);
    // 每次有值改变， ngmodel会改变valid状态,改变value，通知ngform directive
  }
  constructor() {}

  ngOnInit() {}

  login(result: NgForm, submit) {
    // submit如果不给类型，就是any类型，果然typescript是为了帮助编程的
    console.log(result.value, result.valid, submit);
  }
}
