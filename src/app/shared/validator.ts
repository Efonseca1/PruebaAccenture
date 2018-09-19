import {ValidatorFn, AbstractControl} from '@angular/forms';

export function ageValidator(allowedAge): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const dateOfBirth = new Date(control.value).getTime();
      const currentDate = new Date().getTime();
      const diff = Math.floor((currentDate - dateOfBirth) / (1000 * 60 * 60 * 24 * 365.25));
      console.log(diff);
      if (diff < allowedAge) {
        return { 'age': true };
      }
      return null;
    };
  }
  