import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../services/owners.service';
import { Owner } from '../models/owner';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public page = 1;
  public pageSize = 10;

  public owners: Owner[];
  errorMessage: string;

  constructor(
    private toastr: ToastrService,
    private ownersService: OwnersService,
    ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.ownersService.get()
      .subscribe(owners => {
        this.owners = owners;
      });
  }

  removeOwnerAlert(item) {
    Swal.fire({
      title: 'Remover dono',
      text: 'Deseja mesmo remover este dono?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, remover'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeOwner(item.id)
      }
    });
  }

  removeOwner(id) {
    this.ownersService.remove(id)
      .subscribe(response => {
        this.toastr.success('Dono removido com sucesso!');
        this.getList();
      }, (error) => this.toastr.error('Erro ao remover este dono.'));
  }

}

