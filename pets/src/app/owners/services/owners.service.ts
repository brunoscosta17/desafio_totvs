import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Owner } from '../models/owner';

@Injectable()
export class OwnersService {

    fornecedor: Owner = new Owner();

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Owner[]> {
        return this.http
            .get<Owner[]>('https://5f779702d5c9cb001623760a.mockapi.io/api/v1/owner')
    }

    // obterPorId(id: string): Observable<Owner> {
    //     return this.http
    //         .get<Owner>(this.UrlServiceV1 + "fornecedores/" + id, super.ObterAuthHeaderJson())
    //         .pipe(catchError(error));
    // }

    // novoOwner(fornecedor: Owner): Observable<Owner> {
    //     return this.http
    //         .post()
    // }

    // atualizarOwner(fornecedor: Owner): Observable<Owner> {
    //     return this.http
    //         .put(this.UrlServiceV1 + "fornecedores/" + fornecedor.id, fornecedor, super.ObterAuthHeaderJson())
    //         .pipe(
    //             map(super.extractData),
    //             catchError(error));
    // }

    // excluirOwner(id: string): Observable<Owner> {
    //     return this.http
    //         .delete(this.UrlServiceV1 + "fornecedores/" + id, super.ObterAuthHeaderJson())
    //         .pipe(
    //             map(super.extractData),
    //             catchError(error));
    // }

    // atualizarEndereco(endereco: Endereco): Observable<Endereco> {
    //     return this.http
    //         .put(this.UrlServiceV1 + "fornecedores/endereco/" + endereco.id, endereco, super.ObterAuthHeaderJson())
    //         .pipe(
    //             map(super.extractData),
    //             catchError(error));
    // }

    // consultarCep(cep: string): Observable<CepConsulta> {
    //     return this.http
    //         .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
    //         .pipe(catchError(error))
    // }
}
