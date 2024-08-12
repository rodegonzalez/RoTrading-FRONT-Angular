import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatRoundedPipe'
})
export class NumberFormatRoundedPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

}
