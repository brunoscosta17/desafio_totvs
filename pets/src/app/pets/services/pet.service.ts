import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Pet } from '../models/pet';

@Injectable()
export class PetService {

    fornecedor: Pet = new Pet();

    private baseUrl = 'https://5f779702d5c9cb001623760a.mockapi.io/api/v1/';
    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Pet[]> {
        return this.http.get<Pet[]>(`${this.baseUrl}/pets`)
    }

    getById(id: string) {
        return this.http
            .get<Pet>(`${this.baseUrl}pets/${id}`)
    }

    post(pet: Pet) {
        return this.http.post(`${this.baseUrl}/pets`, pet);
    }

    update(pet: Pet) {
        return this.http.put(`${this.baseUrl}/pets/${pet.id}`, pet)
    }

    remove(id: string) {
        return this.http.delete(`${this.baseUrl}/pets/${id}`)
    }

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
