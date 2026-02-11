import { Pipe, PipeTransform } from '@angular/core';
import { TranslationOption } from './translation-option';

@Pipe({
  name: 'translationOptionTranslator',
})
export class TranslationOptionTranslatorPipe implements PipeTransform {
  private readonly translationMap = new Map<TranslationOption, string>([
    [TranslationOption.AutoDetect, 'Taal herkennen'],
    [TranslationOption.Labrador, 'Labrador'],
    [TranslationOption.Mens, 'Mens'],
    [TranslationOption.Parkiet, 'Parkiet'],
    [TranslationOption.Papegaai, 'Papegaai'],
  ]);

  transform(option: TranslationOption): string {
    return this.translationMap.get(option) ?? '';
  }
}
