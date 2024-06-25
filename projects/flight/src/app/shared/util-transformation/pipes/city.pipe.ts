import { Pipe, PipeTransform } from '@angular/core';

export type CityFormat = 'short' | 'long'

@Pipe({
  name: 'city',
  standalone: true
})
export class CityPipe implements PipeTransform {
  transform(value: string, format: CityFormat = 'long'): string {
    let short = '';
    let long = '';

    switch (value) {
      case 'Paris':
        short = 'CDG';
        long = 'Charles de Gaulle Airport';
        break;
      case 'London':
        short = 'LCY';
        long = 'London City Airport';
        break;
      case 'Berlin':
        short = 'BER';
        long = 'Flughafen Berlin Brandenburg - Willy Brandt';
        break;
      default:
        short = long = value;
    }

    if (format === 'short') {
      return short;
    }

    return long;
  }
}
