import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Owner } from '../models/owner';

@Injectable()
export class OwnersService {

    private baseUrl = 'https://5f779702d5c9cb001623760a.mockapi.io/api/v1';

    constructor(
        private http: HttpClient
    ) { }

    get(): Observable<Owner[]> {
        return this.http
            .get<Owner[]>(`${this.baseUrl}/owner`)
    }

    getById(id: string) {
        return this.http
            .get<Owner>(`${this.baseUrl}/owner/${id}`)
    }

    post(pet: Owner) {
        return this.http.post(`${this.baseUrl}/owner`, pet);
    }

    update(pet: Owner) {
        return this.http.put(`${this.baseUrl}/owner/${pet.id}`, pet)
    }

    remove(id: string) {
        return this.http.delete(`${this.baseUrl}/owner/${id}`)
    }
}
