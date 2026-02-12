import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationRequest } from '../../shared/data/translation-request';
import { form, FormField, required } from '@angular/forms/signals';
import { LanguageOption } from '../../shared/data/language-option';
import { TranslationOptions } from '../ui-translation-options/translation-options';
import { LANGUAGE_MAP } from '../../shared/data/allowed-language-map';

@Component({
  selector: 'app-translator-form',
  imports: [ReactiveFormsModule, FormField, TranslationOptions],
  templateUrl: './translator-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatorForm {
  readonly detectionErrorOccurred = input<boolean>(false);
  readonly fromLanguage = input<LanguageOption>(LanguageOption.AutoDetect);

  readonly translate = output<TranslationRequest>();

  private readonly translationModel = signal<TranslationRequest>({
    toLanguage: LanguageOption.Labrador,
    fromLanguage: LanguageOption.AutoDetect,
    sourceText: '',
  });

  protected readonly translationForm = form(this.translationModel, (path) => {
    required(path.sourceText, { message: 'Dit veld is verplicht.' });
  });

  protected readonly toLanguageOptions = computed<LanguageOption[]>(() => {
    return LANGUAGE_MAP[this.translationForm.fromLanguage().value()];
  });

  protected readonly fromLanguageOptions = signal<LanguageOption[]>([
    LanguageOption.AutoDetect,
    LanguageOption.Mens,
    LanguageOption.Labrador,
    LanguageOption.Parkiet,
    LanguageOption.Papegaai,
  ]);

  constructor() {
    effect(() => {
      this.translationForm.fromLanguage().value.set(this.fromLanguage());
    });
  }

  protected onTranslate(): void {
    this.translate.emit({
      sourceText: this.translationForm.sourceText().value(),
      fromLanguage: this.translationForm.fromLanguage().value(),
      toLanguage: this.translationForm.toLanguage().value(),
    });
  }
}
