import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationRequest } from '../../shared/data/translation-request';
import { form, FormField, required, validate } from '@angular/forms/signals';
import { LanguageOption } from '../../shared/data/language-option';
import { TranslationOptions } from '../ui-translation-options/translation-options';
import { LANGUAGE_MAP } from '../../shared/data/allowed-language-map';
import { Translator } from '../../shared/data/translator/translator';

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

  private readonly translator = inject(Translator);

  private readonly translationModel = signal<TranslationRequest>({
    toLanguage: LanguageOption.Labrador,
    fromLanguage: LanguageOption.AutoDetect,
    sourceText: '',
    isDrunk: false,
  });

  protected readonly translationForm = form(this.translationModel, (path) => {
    required(path.sourceText, { message: 'Dit veld is verplicht.' });
    validate(path.sourceText, (ctx) => {
      const text = ctx.value();
      const selectedFromLanguage = ctx.valueOf(path.fromLanguage);
      const detectedLanguage = this.translator.detectLanguage(text);
      if (
        selectedFromLanguage === LanguageOption.AutoDetect ||
        selectedFromLanguage === LanguageOption.Mens ||
        selectedFromLanguage === detectedLanguage
      ) {
        return null;
      }

      return {
        kind: 'invalidFromLanguage',
        message: 'Input komt niet overeen met geselecteerde taal',
      };
    });
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
      isDrunk: this.translationForm.isDrunk().value(),
    });
  }
}
