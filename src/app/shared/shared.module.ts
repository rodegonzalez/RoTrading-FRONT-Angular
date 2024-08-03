
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatWithDecimalsPipe } from './number-format-with-decimals.pipe'; // Importa el pipe

@NgModule({
declarations: [NumberFormatWithDecimalsPipe], // Declara el pipe
  imports: [CommonModule],
  exports: [NumberFormatWithDecimalsPipe] // Exporta el pipe para que esté disponible en otros módulos
})
export class SharedModule { }