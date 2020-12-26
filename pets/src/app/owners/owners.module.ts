import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { OwnersRoutingModule } from './owners.router';
import { OwnersAppComponent } from './owners.app.component';
import { OwnersService } from './services/owners.service';
import { ListComponent } from './list/list.component';


@NgModule({
    declarations: [
        ListComponent,
        OwnersAppComponent
    ],
    imports: [
      CommonModule,
      OwnersRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgBrazil,
      TextMaskModule,
    ],
    providers: [
      OwnersService,
    ]
  })
  export class OwnersModule { }
  