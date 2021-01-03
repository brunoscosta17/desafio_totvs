import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Pet } from '../models/pet';
import { PetService } from '../services/pet.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { OwnersService } from 'src/app/owners/services/owners.service';
import { Owner } from 'src/app/owners/models/owner';

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
    pet: Pet = new Pet();

    owners: Owner[] = [];

    constructor(
        private fb: FormBuilder,
        private petService: PetService,
        private ownersService: OwnersService,
        private router: Router,
        private toastr: ToastrService) {

        super();

        this.validationMessages = {
            name: {
                required: 'Informe o nome',
            },
            nickName: {
                required: 'Informe o apelido',
            },
            breed: {
                required: 'Informe a raça',
            },
            species: {
                required: 'Escolha uma espécie',
            },
            owner: {
                required: 'Escolha um dono',
            },
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
        super.configValidationMessages(this.validationMessages);
    }

    ngOnInit() {

        this.form = this.fb.group({
            name: ['', [Validators.required]],
            nickName: ['', [Validators.required]],
            breed: ['', [Validators.required]],
            species: ['', [Validators.required]],
            owner: ['', [Validators.required]]
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

        controls.nickName.valueChanges
        .subscribe((value: string) => {
            if (controls.nickName.value.length === 1 && controls.nickName.value === ' ') {
                controls.nickName.setValue(value.trim(), { emitEvent: false })
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

            this.pet = Object.assign({}, this.pet, this.form.value);
            this.formResult = JSON.stringify(this.pet);
      
            this.petService.post(this.pet)
              .subscribe(
                response => { 
                    this.toastr.success('Pet salvo com sucesso!');
                    this.router.navigate(['pets/all']);
                },
                error => { this.toastr.error(error) }
              );
          }
    }
    
}