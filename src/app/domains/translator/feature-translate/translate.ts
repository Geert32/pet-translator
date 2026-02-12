import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslatorForm } from '../ui-translator-form/translator-form';
import { TranslationRequest } from '../../shared/data/translation-request';
import { Translator } from '../../shared/data/translator/translator';
import { LanguageOption } from '../../shared/data/language-option';
import { AnimalStylePipe } from '../../shared/data/animal-style-pipe';
import { Drunk } from '../../shared/data/drunk/drunk';

@Component({
  selector: 'app-translate',
  imports: [TranslatorForm, AnimalStylePipe],
  templateUrl: './translate.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Translate {
  private readonly translator = inject(Translator);
  private readonly drunk = inject(Drunk);

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

    let translatedText = this.translator.translate(
      translationRequest.sourceText,
      translationRequest.toLanguage,
    );

    if (translationRequest.isDrunk) {
      translatedText = this.drunk.drankToMuch(translatedText);
    }

    this.translatedText.set(translatedText ?? '');
  }
}
