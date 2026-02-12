import { Injectable } from '@angular/core';
import { TRANSLATORS } from './translators';
import { LanguageOption } from '../language-option';

@Injectable({
  providedIn: 'root',
})
export class Translator {
  private readonly registry = TRANSLATORS;

  translate(text: string | null, option: LanguageOption): string {
    const strategy = this.registry[option];

    if (!text || text.trim().length === 0) {
      return '';
    }

    return strategy ? strategy(text) : text;
  }
}
