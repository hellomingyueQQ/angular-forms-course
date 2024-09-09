import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { noop, Subscription } from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressFormComponent,
      multi: true,
    },
  ],
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
  @Input()
  legend: string;

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  onTouched = () => {};

  onChangeSub: Subscription;

  constructor(private fb: FormBuilder) {}
  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }
  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange);
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }
}
