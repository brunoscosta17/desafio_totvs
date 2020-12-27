import { Pipe, PipeTransform } from '@angular/core';
import { Pet } from './models/pet';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(Pets: Pet[], searchValue: string):Pet[] {
    if (!Pet || !searchValue) {
      return Pets;
    }
    return Pets.filter(pet => pet.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
