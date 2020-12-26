import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { OwnersAppComponent } from './owners.app.component';

const ownersRouterConfig: Routes = [
    {
        path: '', component: OwnersAppComponent,
        children: [
            { path: 'todos', component: ListComponent },
            // {
            //     path: 'adicionar-novo', component: NovoComponent,
            //     data: [{ claim: { nome: 'Pet', valor: 'Adicionar'}}]
            // },
            // {
            //     path: 'editar/:id', component: EditarComponent,
            //     canActivate: [FornececedorGuard],
            //     data: [{ claim: { nome: 'Pet', valor: 'Atualizar' } }],
            //     resolve: {
            //         fornecedor: PetResolve
            //     }
            // },
            // {
            //     path: 'detalhes/:id', component: DetalhesComponent,
            //     resolve: {
            //         fornecedor: PetResolve
            //     }
            // },
            // {
            //     path: 'excluir/:id', component: ExcluirComponent,
            //     canActivate: [FornececedorGuard],
            //     data: [{ claim: { nome: 'Pet', valor: 'Excluir' } }],
            //     resolve: {
            //         fornecedor: PetResolve
            //     }
            // }
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