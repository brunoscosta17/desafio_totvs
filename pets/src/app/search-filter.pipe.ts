import { Pipe, PipeTransform } from '@angular/core';
import { Owner } from './owners/models/owner';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(Owners: Owner[], searchValue: string): Owner[] {
    if (!Owner || !searchValue) {
      return Owners;
    }
    return Owners.filter(owner => owner.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
