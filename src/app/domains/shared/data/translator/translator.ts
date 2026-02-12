import { Injectable } from '@angular/core';
import { TRANSLATORS } from './translators';
import { LanguageOption } from '../language-option';

@Injectable({
  providedIn: 'root',
})
export class Translator {
  private readonly registry = TRANSLATORS;

  translate(text: string | null, option: LanguageOption): string {
    const translateFn = this.registry[option].translate;

    if (!text || text.trim().length === 0) {
      return '';
    }

    const trimmedText = text.trim();
    return translateFn ? translateFn(trimmedText) : trimmedText;
  }

  detectLanguage(text: string): LanguageOption | null {
    return (
      (Object.keys(this.registry).find((key) =>
        this.registry[key as LanguageOption]?.isMatch(text),
      ) as LanguageOption) ?? null
    );
  }

  applyStyling(text: string, option: LanguageOption): string {
    if (!text) {
      return '';
    }

    const applyStyling = this.registry[option].applyStyling;
    return applyStyling ? applyStyling(text) : text;
  }
}
