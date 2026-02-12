import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslatorForm } from '../ui-translator-form/translator-form';
import { TranslationRequest } from '../../shared/data/translation-request';
import { Translator } from '../../shared/data/translator/translator';
import { LanguageOption } from '../../shared/data/language-option';

@Component({
  selector: 'app-translate',
  imports: [TranslatorForm],
  templateUrl: './translate.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Translate {
  private readonly translator = inject(Translator);

  protected readonly translatedText = signal<string>('');
  protected readonly detectedLanguage = signal<LanguageOption>(LanguageOption.AutoDetect);

  protected handleTranslation(translationRequest: TranslationRequest): void {
    if (translationRequest.fromLanguage === LanguageOption.AutoDetect) {
      const detectedLanguage = this.translator.detectLanguage(translationRequest.sourceText);
      this.detectedLanguage.set(detectedLanguage);
    }

    const translatedText = this.translator.translate(
      translationRequest.sourceText,
      translationRequest.toLanguage,
    );

    this.translatedText.set(translatedText ?? '');
  }
}
