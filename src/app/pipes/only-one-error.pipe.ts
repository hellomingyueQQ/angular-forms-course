import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "onlyOneError",
  //   pure: true, // 默认值 ,意味着recompute只有input改变的时候
  //   pure: false, // 意味着recompute每次变化的时候， change detection cycle
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(allErrors: any, errorsPriority: string[]): any {
    // value就是password.errors

    if (!allErrors) {
      return null;
    }

    const onlyOneError: any = {};
    for (let error of errorsPriority) {
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }
    return onlyOneError;
  }
}
