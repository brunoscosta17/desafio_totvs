import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { PetRoutingModule } from './pet.router';
import { PetAppComponent } from './pet.app.component';
import { PetService } from './services/pet.service';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
    declarations: [
      PetAppComponent,
      ListComponent,
      AddComponent,
      EditComponent
    ],
    imports: [
      CommonModule,
      PetRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgBrazil,
      TextMaskModule,
    ],
    providers: [
      PetService,
    ]
  })
  export class PetsModule { }
  