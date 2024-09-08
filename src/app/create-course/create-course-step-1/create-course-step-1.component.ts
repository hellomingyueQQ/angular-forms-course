import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { courseTitleValidator } from "../../validators/course-title.validator";
import { filter } from "rxjs/operators";
import { Observable } from "rxjs";

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.courses)],
        updateOn: "blur", //避免频繁发送请求
      }, // 全部是同步的validator
    ],
    releaseAt: [new Date(), Validators.required],
    category: ["BEGINNER", Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ["", [Validators.required, Validators.minLength(3)]],
  });

  courseCategories$: Observable<CourseCategory>;
  constructor(private fb: FormBuilder, private courses: CoursesService) {}
  ngOnInit() {
    this.courseCategories$ = this.courses.findCourseCategories();
    const draft = localStorage.getItem("STEP_1");
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((val) => {
        localStorage.setItem("STEP_1", JSON.stringify(val));
      });
    // 只保存valid value
    // 存在了application的本地存储空间
    // 提交后，要注意删除数据
  }

  get courseTitle() {
    return this.form.controls["title"];
  }
}
// 这节课要把用户临时输入，且没有提交内容存在浏览器的存储中，这样navigate away的时候，用户再回来的时候，还能看到之前的输入
