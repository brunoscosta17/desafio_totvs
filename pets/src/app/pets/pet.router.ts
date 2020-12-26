import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetAppComponent } from './pet.app.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

const petRouterConfig: Routes = [
    {
        path: '', component: PetAppComponent,
        children: [
            { path: 'todos', component: ListComponent },
            {
                path: 'add', component: AddComponent,
            },
            // {
            //     path: 'editar/:id', component: EditarComponent,
            //     canActivate: [FornececedorGuard],
            //     data: [{ claim: { nome: 'Fornecedor', valor: 'Atualizar' } }],
            //     resolve: {
            //         fornecedor: FornecedorResolve
            //     }
            // },
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