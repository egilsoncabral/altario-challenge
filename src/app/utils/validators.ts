import { AbstractControl, ValidatorFn } from '@angular/forms';

export function currencyValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value < 0 ? {'invalidCurrency': control.value} : null;
    };
  }