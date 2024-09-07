import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPasswordStrengthValidator(): ValidatorFn {
  // 没有错误返回null
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    // 如果没有值就返回null

    const hasUpperCase = /[A-Z]+/.test(value); // +表达至少出现一次
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? { passwordStrength: true } : null;
  };
}

// Jim cooper的课程是需要validator function，不需要vadalidator directive
// very good, 这节课将validator更加推进一步
