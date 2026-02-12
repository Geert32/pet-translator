import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslatorForm } from '../ui-translator-form/translator-form';
import { TranslationRequest } from '../../shared/data/translation-request';
import { Translator } from '../../shared/data/translator/translator';

@Component({
  selector: 'app-translate',
  imports: [TranslatorForm],
  templateUrl: './translate.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Translate {
  private readonly translator = inject(Translator);

  protected readonly translatedText = signal<string>('');

  protected handleTranslation(translationRequest: TranslationRequest): void {
    const translatedText = this.translator.translate(
      translationRequest.sourceText,
      translationRequest.toLanguage,
    );

    this.translatedText.set(translatedText ?? '');
  }
}
