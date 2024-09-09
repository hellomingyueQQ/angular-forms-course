import { Component, Input } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { catchError, finalize } from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { noop, of } from "rxjs";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input()
  requiredFileType: string;
  fileUploadError = false;
  fileUploadSuccess = false;
  fileName = "";
  uploadProgress: number;
  onChange = (fileName: string) => {};
  onTouched = () => {};
  onValidatorChange = () => {};
  disabled: boolean = false;
  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }
    let errors: any = {
      requiredFileType: this.requiredFileType,
    };

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }
    return errors;
  }
  registerOnValidatorChange?(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  // form 会call这个方法
  writeValue(value: any) {
    this.fileName = value;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  setDisabledState?(disabled: boolean) {
    this.disabled = disabled;
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }
  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      console.log(this.fileName);

      const formData = new FormData(); //浏览器功能
      formData.append("thumbnail", file);
      this.fileUploadError = false;
      this.http
        .post("/api/thumbnail-upload", formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((err) => {
            this.fileUploadError = true;
            return of(err);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              (100 * event.loaded) / event.total
            );
            console.log(this.uploadProgress);
          } else if (event.type == HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }
}
