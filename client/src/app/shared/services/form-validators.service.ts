import { FormControl, FormGroup } from '@angular/forms';

export class FormValidators {
    static noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value ? control.value.trim().length === 0 : false);
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    static nameValidator(control: FormControl) {
        if ((/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(control.value)) {
            return null;
        }
        return { pattern: true };
    }

    static amountValidator(control: FormControl) {
        if ((/^[1-9]\d*(\.\d+)?$/).test(control.value)) {
            return null;
        }
        return { pattern: true };
    }
}
