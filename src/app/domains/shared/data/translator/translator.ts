import { Injectable } from '@angular/core';
import { TRANSLATORS } from './translators';
import { LanguageOption } from '../language-option';

@Injectable({
  providedIn: 'root',
})
export class Translator {
  private readonly registry = TRANSLATORS;

  translate(text: string, option: LanguageOption): string | null {
    const strategy = this.registry[option];

    if (!text) {
      return '';
    }

    return strategy ? strategy(text) : text;
  }
}
