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

  // form:FormGroup = this.fb.group({ // 这么写，就丧失了推测能力，智能提示 formGroup<any>
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
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  get email() {
    return this.form.controls["email"];
  }

  get password() {
    return this.form.controls["password"];
  }

  login() {
    const formValue = this.form.value;
    // email 和 password可以从初始值推测数据类型
    // reactive form is strongly typed 
  }
}
