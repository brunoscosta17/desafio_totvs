import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { OwnersRoutingModule } from './owners.router';
import { OwnersAppComponent } from './owners.app.component';
import { OwnersService } from './services/owners.service';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ListComponent,
        OwnersAppComponent,
        AddComponent,
        EditComponent,
        DetailsComponent
    ],
    imports: [
      CommonModule,
      OwnersRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgBrazil,
      TextMaskModule,
      NgbModule,
      NgbPaginationModule
    ],
    providers: [
      OwnersService,
    ]
  })
  export class OwnersModule { }
  