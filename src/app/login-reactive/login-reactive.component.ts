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

  get email() {
    return this.form.controls["email"]; // this.form.get('email') 根据提示，这个也可以用
  }

  get password() {
    return this.form.controls["password"];
  }
}
// 相比于template，reactive form的html只有formGroup和formControlName两个指令
// formModel can be dynamic programmatically
// validator可以使validator function,不需要在依赖注入中配置
// 作者的观点，如果新项目，尽量用reactive form
