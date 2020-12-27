import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetAppComponent } from './pet.app.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const petRouterConfig: Routes = [
    {
        path: '', component: PetAppComponent,
        children: [
            { path: 'all', component: ListComponent },
            {
                path: 'add', component: AddComponent,
            },
            {
                path: 'edit/:id', component: EditComponent,
            },
            {
                path: 'details/:id', component: DetailsComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(petRouterConfig)
    ],
    exports: [RouterModule]
})
export class PetRoutingModule { }