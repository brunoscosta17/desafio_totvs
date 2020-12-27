import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet } from '../models/pet';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  searchValue: string;

  public page = 1;
  public pageSize = 10;

  public pets: Pet[];
  errorMessage: string;

  constructor(
    private petService: PetService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.petService.get()
      .subscribe(pets => {
        this.pets = pets;
      });
  }

  removePetAlert(item) {
    Swal.fire({
      title: 'Remover pet',
      text: 'Deseja mesmo remover este pet?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, remover'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removePet(item.id)
      }
    });
  }

  removePet(id) {
    this.petService.remove(id)
      .subscribe(response => {
        this.toastr.success('Pet removido com sucesso!');
        this.getList();
      }, (error) => this.toastr.error('Erro ao remover este pet.'));
  }

}

