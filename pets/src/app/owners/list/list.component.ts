import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../services/owners.service';
import { Owner } from '../models/owner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public pets: Owner[];
  errorMessage: string;

  constructor(
    private petService: OwnersService) { }

  ngOnInit(): void {
    this.petService.get()
      .subscribe(pets => {
        this.pets = pets;
        // this.getOwnerData(pets.ownerId);
      });
    
  }

  getOwnerData(id: string) {

  }
}

