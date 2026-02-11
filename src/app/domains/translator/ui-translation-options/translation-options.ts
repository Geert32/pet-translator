import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { TranslationOption } from '../../shared/data/translation-option';
import { TranslationOptionTranslatorPipe } from '../../shared/data/translation-option-translator-pipe';

@Component({
  selector: 'app-translation-options',
  imports: [ReactiveFormsModule, TranslationOptionTranslatorPipe],
  templateUrl: './translation-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationOptions implements FormValueControl<TranslationOption | undefined> {
  readonly options = input.required<TranslationOption[]>();
  readonly label = input.required<string>();
  readonly id = input.required<string>();

  readonly value = model<TranslationOption>();
  readonly disabled = input(false);

  readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);

  protected setValue(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value as unknown as TranslationOption;
    this.value.update(() => value);
  }
}
