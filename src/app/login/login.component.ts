import { NgFor } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm") form: NgForm;
  constructor() {}

  ngOnInit() {}

  test(result: NgForm) {
    console.log(result.value, result.valid);

    console.log(1, result);
    console.log(2, this.form);
    console.log(result instanceof NgForm);

    // 这里打印出来的就是ngForm这个指令
  }
}
