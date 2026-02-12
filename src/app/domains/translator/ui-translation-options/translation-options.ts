import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { LanguageOption } from '../../shared/data/language-option';
import { LanguageOptionTranslatorPipe } from '../../shared/data/language-option-translator-pipe';

@Component({
  selector: 'app-translation-options',
  imports: [ReactiveFormsModule, LanguageOptionTranslatorPipe],
  templateUrl: './translation-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationOptions implements FormValueControl<LanguageOption | undefined> {
  readonly options = input.required<LanguageOption[]>();
  readonly label = input.required<string>();
  readonly id = input.required<string>();

  readonly value = model<LanguageOption>();
  readonly disabled = input(false);

  readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);

  protected setValue(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value as unknown as LanguageOption;
    this.value.update(() => value);
  }
}
