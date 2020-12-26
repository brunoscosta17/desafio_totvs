import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import cloneDeep from 'lodash';
import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NgxSpinnerService } from 'ngx-spinner';

import { Pet } from '../models/pet';
import { PetService } from '../services/pet.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  form: FormGroup;

  pet: Pet = new Pet();

  textoDocumento: string = '';

  MASKS = utilsBr.MASKS;

  constructor(private fb: FormBuilder,
    private petService: PetService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {

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

    this.pet = this.route.snapshot.data['pet'];
  }

  ngOnInit() {

    this.petService.getById(this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe((response) => { 
            this.pet = response;
            this.form.patchValue(this.pet);
        });

    // this.spinner.show();

    this.form = this.fb.group({
        name: ['', [Validators.required]],
        nickName: ['', [Validators.required]],
        breed: ['', [Validators.required]],
        species: ['', [Validators.required]],
    });

    setTimeout(() => {
    //   this.spinner.hide();
    }, 1000);
  }

  handleSubmit() {
      if (this.form.valid) {
          
        const valueFinal = cloneDeep(this.form.value);
        valueFinal.id = this.activatedRoute.snapshot.paramMap.get('id');
          
        this.petService.update(valueFinal)
            .subscribe(
            success => { 
                this.processSuccess(success);
                this.router.navigate(['pets/todos']); 
            },
            error => { this.processError(error) });
        }
  }

  processSuccess(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Pet atualizado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/pets/todos']);
      });
    }
  }

  processError(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
