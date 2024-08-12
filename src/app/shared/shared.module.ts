
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatWithDecimalsPipe } from './number-format-with-decimals.pipe'; // Importa el pipe
import { NumberFormatRoundedPipe } from './number-format-without-decimals.pipe'; // Importa el pipe

@NgModule({
declarations: [
  NumberFormatWithDecimalsPipe,
  NumberFormatRoundedPipe
], // Declara el pipe
  imports: [CommonModule],
  exports: [
    NumberFormatWithDecimalsPipe,
    NumberFormatRoundedPipe
  ] // Exporta el pipe para que esté disponible en otros módulos
})
export class SharedModule {

  getDateTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0'); // Corregido para obtener el día correcto
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minute = `${now.getMinutes()}`.padStart(2, '0');
    const second = `${now.getSeconds()}`.padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`; // Añadido hora y minutos
   }

   getDate(){
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0'); // Corregido para obtener el día correcto
    return `${year}-${month}-${day}`; // Añadido hora y minutos
   }

  getTime(){
    const now = new Date();
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minute = `${now.getMinutes()}`.padStart(2, '0');
    return `${hour}:${minute}`; 
   }

   countDecimalDigits(value: number): number {
    const valueStr = value.toString();
    const decimalIndex = valueStr.indexOf('.');
    
    if (decimalIndex === -1) {
      return 0;
    }
    
    return valueStr.length - decimalIndex - 1;
  }


 }