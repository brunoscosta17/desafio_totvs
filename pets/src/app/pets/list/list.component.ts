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

  public pets: Pet[];
  errorMessage: string;

  constructor(
    private petService: PetService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.petService.get()
      .subscribe(pets => {
        this.pets = pets;
        // this.getOwnerData(pets.ownerId);
      });
    
  }

  getOwnerData(id: string) {

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
      },
      error => this.toastr.error('Erro ao remover este pet.'));
  }

}

