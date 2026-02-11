import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Translate } from './domains/translator/feature-translate/translate';

@Component({
  selector: 'app-root',
  imports: [Translate],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
