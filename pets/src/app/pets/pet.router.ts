import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetAppComponent } from './pet.app.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const petRouterConfig: Routes = [
    {
        path: '', component: PetAppComponent,
        children: [
            { path: 'todos', component: ListComponent },
            {
                path: 'add', component: AddComponent,
            },
            {
                path: 'edit/:id', component: EditComponent,
            },
            // {
            //     path: 'detalhes/:id', component: DetalhesComponent,
            //     resolve: {
            //         fornecedor: FornecedorResolve
            //     }
            // },
            // {
            //     path: 'excluir/:id', component: ExcluirComponent,
            //     canActivate: [FornececedorGuard],
            //     data: [{ claim: { nome: 'Fornecedor', valor: 'Excluir' } }],
            //     resolve: {
            //         fornecedor: FornecedorResolve
            //     }
            // }
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