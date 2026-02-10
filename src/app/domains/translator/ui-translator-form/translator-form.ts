import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslationRequest } from '../../shared/data/translation-request';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-translator-form',
  imports: [ReactiveFormsModule, FormField],
  templateUrl: './translator-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatorForm {
  readonly showValidationError = input<boolean>(false);

  readonly translate = output<TranslationRequest>();

  private readonly translationModel = signal<TranslationRequest>({
    toLanguage: 'labrador',
    fromLanguage: 'auto-detect',
    sourceText: '',
  });

  protected readonly translationForm = form(this.translationModel);

  protected onTranslate(): void {
    this.translate.emit({
      sourceText: this.translationForm.sourceText().value(),
      fromLanguage: this.translationForm.fromLanguage().value(),
      toLanguage: this.translationForm.toLanguage().value(),
    });
  }
}
