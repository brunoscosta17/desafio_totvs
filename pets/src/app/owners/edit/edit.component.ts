import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, SimpleChanges  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';

import cloneDeep from 'lodash';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { OwnersService } from 'src/app/owners/services/owners.service';
import { Owner } from 'src/app/owners/models/owner';
import { dateToString } from 'src/app/utils/date.functions';

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
    formResult: string = '';

    owner: Owner = new Owner();
    owners: Owner[] = [];

    public MASKS = MASKS;

    constructor(
        private fb: FormBuilder,
        private ownersService: OwnersService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService) {

          this.validationMessages = {
            name: {
                required: 'Informe o nome',
            },
            birthday: {
                required: 'Informe a data de nascimento',
            },
            email: {
                required: 'Informe o email',
                email: 'Informe um e-mail válido!'
            },
            phone: {
                required: 'Informe o telefone',
            },
            address: {
                required: 'Informe o endereço',
            },
          };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.owner = this.activatedRoute.snapshot.data['owner'];
  }

  ngOnInit() {

    this.ownersService.getById(this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe((response) => { 
            this.owner = response;
            this.owner.birthday = dateToString(this.owner.birthday);
            this.form.patchValue(this.owner);
        });

        this.ownersService.get()
            .subscribe((response) => this.owners = response);

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, NgBrazilValidators.telefone]],
      address: ['', [Validators.required]],
    });

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
      if (this.form.valid) {

          Swal.fire({
              title: 'Atualizar dono?',
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
                  this.ownersService.update(valueFinal)
                      .subscribe(
                      success => { 
                          this.processSuccess(success);
                          this.router.navigate(['pets/all']); 
                      },
                      error => { this.processError(error) });
              }
          });
      }
  }

  processSuccess(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Owner atualizado com sucesso!', 'Sucesso!');
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
