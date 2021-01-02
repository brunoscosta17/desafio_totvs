import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';

import cloneDeep from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Pet } from '../models/pet';
import { PetService } from '../services/pet.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { OwnersService } from 'src/app/owners/services/owners.service';
import { Owner } from 'src/app/owners/models/owner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    validationMessages: ValidationMessages;
    genericValidator: GenericValidator;
    displayMessage: DisplayMessage = {};

    errors: any[] = [];
    form: FormGroup;

    pet: Pet = new Pet();

    owners: Owner[] = [];

    constructor(private fb: FormBuilder,
        private petService: PetService,
        private ownersService: OwnersService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private modalService: NgbModal) {

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
            required: 'Informe a espécie',
            },
        };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.pet = this.route.snapshot.data['pet'];
  }

  ngOnInit() {

    this.petService.getById(this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe((response) => { 
            this.pet = response;
            this.form.patchValue(this.pet);
        });

        this.ownersService.get()
            .subscribe((response) => this.owners = response);

    this.form = this.fb.group({
        name: ['', [Validators.required]],
        nickName: ['', [Validators.required]],
        breed: ['', [Validators.required]],
        species: ['', [Validators.required]],
        owner: ['', [Validators.required]]
    });

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
  if (this.form.valid) {

      Swal.fire({
          title: 'Atualizar pet?',
          text: "Tem certeza que deseja atualizar os dados?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, atualizar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
              const valueFinal = cloneDeep(this.form.value);
              valueFinal.id = this.activatedRoute.snapshot.paramMap.get('id');
              this.petService.update(valueFinal)
                  .subscribe(
                  success => { 
                      this.processSuccess(success);
                      this.router.navigate(['pets/all']); 
                  },
                  error => { this.processError(error) });
          }
      })  
  }
}

  processSuccess(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Pet atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/pets/all']);
      });
    }
  }

  processError(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
