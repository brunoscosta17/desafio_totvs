import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utils/generic-form-validation';

export abstract class FormBaseComponent {

    displayMessage: DisplayMessage = {};
    genericValidator: GenericValidator;
    validationMessages: ValidationMessages;

    changesNotSaved: boolean;

    protected configValidationMessages(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected configValidationMessagesForm(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.validateForm(formGroup)
        });
    }

    protected validateForm(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.showMessages(formGroup);
        this.changesNotSaved = true;
    }
}