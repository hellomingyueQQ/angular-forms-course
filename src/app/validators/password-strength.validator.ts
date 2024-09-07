import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPasswordStrengthValidator(): ValidatorFn {
    // 没有错误返回null
  return (control: AbstractControl): ValidationErrors | null => {};
}
