import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatorForm } from '../ui-translator-form/translator-form';
import { TranslationRequest } from '../../shared/data/translation-request';

@Component({
  selector: 'app-translate',
  imports: [TranslatorForm],
  templateUrl: './translate.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Translate {
  protected handleTranslation(translationRequest: TranslationRequest): void {
    console.log('translation: ', translationRequest);
  }
}
