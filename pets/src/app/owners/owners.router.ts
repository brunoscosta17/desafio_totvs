import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnersAppComponent } from './owners.app.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const ownersRouterConfig: Routes = [
    {
        path: '', component: OwnersAppComponent,
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
        RouterModule.forChild(ownersRouterConfig)
    ],
    exports: [RouterModule]
})
export class OwnersRoutingModule { }