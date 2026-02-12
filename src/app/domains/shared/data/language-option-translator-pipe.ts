import { Pipe, PipeTransform } from '@angular/core';
import { LanguageOption } from './language-option';

@Pipe({
  name: 'languageOptionTranslator',
})
export class LanguageOptionTranslatorPipe implements PipeTransform {
  private readonly translationMap = new Map<LanguageOption, string>([
    [LanguageOption.AutoDetect, 'Taal herkennen'],
    [LanguageOption.Labrador, 'Labrador'],
    [LanguageOption.Mens, 'Mens'],
    [LanguageOption.Parkiet, 'Parkiet'],
    [LanguageOption.Papegaai, 'Papegaai'],
  ]);

  transform(option: LanguageOption): string {
    return this.translationMap.get(option) ?? '';
  }
}
