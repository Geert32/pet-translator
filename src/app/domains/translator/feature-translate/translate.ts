import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslatorForm } from '../ui-translator-form/translator-form';
import { TranslationRequest } from '../../shared/data/translation-request';
import { Translator } from '../../shared/data/translator/translator';
import { LanguageOption } from '../../shared/data/language-option';
import { AnimalStylePipe } from '../../shared/data/animal-style-pipe';

@Component({
  selector: 'app-translate',
  imports: [TranslatorForm, AnimalStylePipe],
  templateUrl: './translate.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Translate {
  private readonly translator = inject(Translator);

  protected readonly translatedText = signal<string>('');
  protected readonly languageDetectionFailed = signal<boolean>(false);
  protected readonly detectedLanguage = signal<LanguageOption>(LanguageOption.AutoDetect);
  protected readonly stylingLanguage = signal<LanguageOption>(LanguageOption.Mens);

  protected handleTranslation(translationRequest: TranslationRequest): void {
    this.languageDetectionFailed.set(false);
    this.stylingLanguage.set(translationRequest.toLanguage);

    if (translationRequest.fromLanguage === LanguageOption.AutoDetect) {
      const detectedLanguage = this.translator.detectLanguage(translationRequest.sourceText);
      if (detectedLanguage) {
        this.detectedLanguage.set(detectedLanguage);
      } else {
        this.languageDetectionFailed.set(true);
        return;
      }
    }

    const translatedText = this.translator.translate(
      translationRequest.sourceText,
      translationRequest.toLanguage,
    );

    this.translatedText.set(translatedText ?? '');
  }
}
