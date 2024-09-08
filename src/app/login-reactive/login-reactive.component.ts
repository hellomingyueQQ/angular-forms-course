import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // email = new FormControl("", {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: "blur",
  // });
  // password = new FormControl("", {
  //   validators: [
  //     Validators.required,
  //     Validators.minLength(8),
  //     createPasswordStrengthValidator(),
  //   ],
  // });

  form = this.fb.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      },
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
      [],
    ],
  });
  // 第三个数组是异步的validators，这里没有，所以是空数组
  // ctr = this.fb.control(""); // fb也有创建control的方法, 但是不常用

  // 为了减少verbose，引入formbuilder
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
