import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationRequest } from '../../shared/data/translation-request';
import { form, FormField } from '@angular/forms/signals';
import { TranslationOption } from '../../shared/data/translation-option';
import { TranslationOptions } from '../ui-translation-options/translation-options';

@Component({
  selector: 'app-translator-form',
  imports: [ReactiveFormsModule, FormField, TranslationOptions],
  templateUrl: './translator-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatorForm {
  readonly showValidationError = input<boolean>(false);

  readonly translate = output<TranslationRequest>();

  private readonly translationModel = signal<TranslationRequest>({
    toLanguage: TranslationOption.Labrador,
    fromLanguage: TranslationOption.AutoDetect,
    sourceText: '',
  });

  protected readonly translationForm = form(this.translationModel);

  protected readonly toLanguageOptions = signal<TranslationOption[]>([
    TranslationOption.Labrador,
    TranslationOption.Parkiet,
    TranslationOption.Papegaai,
  ]);

  protected readonly fromLanguageOptions = signal<TranslationOption[]>([
    TranslationOption.AutoDetect,
    TranslationOption.Mens,
    TranslationOption.Labrador,
    TranslationOption.Parkiet,
    TranslationOption.Papegaai,
  ]);

  protected onTranslate(): void {
    this.translate.emit({
      sourceText: this.translationForm.sourceText().value(),
      fromLanguage: this.translationForm.fromLanguage().value(),
      toLanguage: this.translationForm.toLanguage().value(),
    });
  }
}
