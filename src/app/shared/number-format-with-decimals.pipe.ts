import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatWithDecimalsPipe'
})
export class NumberFormatWithDecimalsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(value);
  }

}

@Pipe({
  name: 'numberFormatWithTwoDecimalsPipe'
})
export class NumberFormatWithTwoDecimalsPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

}

