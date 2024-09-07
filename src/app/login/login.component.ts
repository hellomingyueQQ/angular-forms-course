import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  val = {
    email: "hello@gmail.com",
    password: "123456",
  };
  // 设置初始值
  constructor() {}

  ngOnInit() {}

  login(result: NgForm, submit) {
    console.log(result.value, result.valid, submit);
    console.log("val", this.val);
  }
}
