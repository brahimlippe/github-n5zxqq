import { Pipe, PipeTransform } from '@angular/core';
import { Airport } from './airport';

@Pipe({
  name: 'airportSelector'
})
export class AirportSelectorPipe implements PipeTransform {

  transform(airports: Airport[], pattern: string) {
    return airports.filter(airport => airport.matches(pattern)).slice(0, 10);
  }

}
