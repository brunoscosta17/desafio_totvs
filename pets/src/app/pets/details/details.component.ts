import { Pet } from '../models/pet';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  pet: any = new Pet();

  constructor(
    private route: ActivatedRoute,
    private petService: PetService) {
  }

  ngOnInit():void {
    this.petService.getById(this.route.snapshot.params['id'])
      .subscribe((response) => this.pet = response);
  }
}
