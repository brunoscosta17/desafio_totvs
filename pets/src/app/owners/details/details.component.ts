import { Owner } from '../models/owner';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { OwnersService } from '../services/owners.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  pet: any = new Owner();

  constructor(
    private route: ActivatedRoute,
    private petService: OwnersService) {
  }

  ngOnInit():void {
    this.petService.getById(this.route.snapshot.params['id'])
      .subscribe((response) => this.pet = response);
  }
}
