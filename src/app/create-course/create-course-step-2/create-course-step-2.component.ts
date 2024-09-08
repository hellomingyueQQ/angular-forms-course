import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group({
    courseType: ["premium", Validators.required],
    price: [
      null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(999),
        Validators.pattern("[0-9]+"),
      ],
    ],
    promoStartAt: [null],
    promoEndAt: [null],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      const priceContrl = this.form.controls["price"];
      if (val.courseType === "free" && priceContrl.enabled) {
        // priceContrl.enabled:avoid having to constantly disable here this control every time that a new value is emitted.
        priceContrl.disable({ emitEvent: false }); //妙啊
        // make sure that this disabling of the price control does not trigger a new value=> infinite loop
        // 一旦disable， form.value就不包含那个control的值了
      } else if (val.courseType === "premium" && priceContrl.disabled) {
        priceContrl.enable({ emitEvent: false });
      }
    });
  }
}
