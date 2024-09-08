import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  form = this.fb.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      },
    ], //当使用NonNullableFormBuilder，这样定义就可以了，下面的代码会报错
    // email: this.fb.nonNullable.control("", {
    //   validators: [Validators.required, Validators.email],
    //   updateOn: "blur",
    // }), // 这样处理，reset后的email就不会是null，而是空字符串
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
  });

  // constructor(private fb: FormBuilder) {}

  constructor(private fb: NonNullableFormBuilder) {} //如果所有的字段都是non null，可以用NonNullableFormBuilder
  ngOnInit() {}

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }

  login() {
    const formValue = this.form.value;
  }
  reset() {
    this.form.reset();
    console.log(this.form.value); // email和password都是null
  }
}
