import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';

import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Pet } from '../models/pet';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})

export class AddComponent extends FormBaseComponent implements OnInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    errors: any[] = [];
    form: FormGroup;
    formResult: string = '';
    pet: Pet = new Pet();

    constructor(
        private fb: FormBuilder,
        private petService: PetService,
        private router: Router,
        private toastr: ToastrService) {

        super();

        this.validationMessages = {
            name: {
            required: 'Informe o nome',
            },
            nickname: {
            required: 'Informe o apelido',
            },
            breed: {
            required: 'Informe a raça',
            },
            species: {
            required: 'Informe a espécie',
            },
        };

        super.configValidationMessages(this.validationMessages);
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            nickName: ['', [Validators.required]],
            breed: ['', [Validators.required]],
            species: ['', [Validators.required]],
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
                    this.router.navigate(['pets/todos']);
                },
                error => { this.toastr.error(error) }
              );
          }
    }
    
}