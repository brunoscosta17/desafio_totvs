import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { PetRoutingModule } from './pet.router';
import { PetAppComponent } from './pet.app.component';
import { PetService } from './services/pet.service';
import { OwnersService } from '../owners/services/owners.service';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
    declarations: [
      PetAppComponent,
      ListComponent,
      AddComponent,
      EditComponent,
      DetailsComponent,
      SearchFilterPipe
    ],
    imports: [
      CommonModule,
      PetRoutingModule,
      FormsModule,
      NgbModule,
      NgbPaginationModule,
      ReactiveFormsModule,
      NgBrazil,
      TextMaskModule,
    ],
    providers: [
      PetService,
      OwnersService
    ]
  })
  export class PetsModule { }
  