import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { map, tap } from "rxjs/operators";
export function courseTitleValidator(
  courses: CoursesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    // return promise or observable
    return courses.findAllCourses().pipe(
      map((courses) => {
        const course = courses.find(
          (course) =>
            course.description.toLowerCase() === control.value.toLowerCase()
        );

        return course ? { titleExsits: true } : null;
      })
    );
  };
}
