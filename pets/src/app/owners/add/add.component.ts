import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { dateToSeconds } from 'src/app/utils/date.functions';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Owner } from '../models/owner';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { OwnersService } from 'src/app/owners/services/owners.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})

export class AddComponent extends FormBaseComponent implements OnInit, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};

    errors: any[] = [];
    form: FormGroup;
    formResult: string = '';

    owner: Owner = new Owner();
    owners: Owner[] = [];

    public MASKS = MASKS;

    constructor(
        private fb: FormBuilder,
        private ownersService: OwnersService,
        private router: Router,
        private toastr: ToastrService) {

        super();

        this.validationMessages = {
            name: {
                required: 'Informe o nome!',
            },
            birthday: {
                required: 'Informe a data de nascimento!',
            },
            email: {
                required: 'Informe o email!',
                email: 'Informe um e-mail válido!'
            },
            phone: {
                required: 'Informe o telefone!',
            },
            address: {
                required: 'Informe o endereço!',
            },
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
        super.configValidationMessages(this.validationMessages);
    }

    ngOnInit() {

        this.form = this.fb.group({
            name: ['', [Validators.required]],
            birthday: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, NgBrazilValidators.telefone]],
            address: ['', [Validators.required]],
        });

        this.ownersService.get()
            .subscribe((response) => this.owners = response);

        const controls = this.form.controls;

        controls.name.valueChanges
            .subscribe((value: string) => {
                if (controls.name.value.length === 1 && controls.name.value === ' ') {
                    controls.name.setValue(value.trim(), { emitEvent: false })
                }
            });

        controls.address.valueChanges
        .subscribe((value: string) => {
            if (controls.address.value.length === 1 && controls.address.value === ' ') {
                controls.address.setValue(value.trim(), { emitEvent: false })
            }
        });

    }

    ngAfterViewInit(): void {
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
        merge(...controlBlurs).subscribe(() => {
            this.displayMessage = this.genericValidator.showMessages(this.form);
        });
    }

    handleSubmit() {
        if (this.form.dirty && this.form.valid) {

            this.owner = Object.assign({}, this.owner, this.form.value);
            this.owner.birthday = dateToSeconds(this.owner.birthday);
            this.formResult = JSON.stringify(this.owner);
      
            this.ownersService.post(this.owner)
              .subscribe(
                response => { 
                    this.toastr.success('Dono salvo com sucesso!');
                    this.router.navigate(['owners/all']);
                },
                error => { this.toastr.error(error) }
              );
          }
    }
    
}