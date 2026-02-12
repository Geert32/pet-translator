import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Translator } from './translator/translator';
import { LanguageOption } from './language-option';

@Pipe({
  name: 'animalStyle',
})
export class AnimalStylePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  private translator = inject(Translator);

  transform(text: string, option: LanguageOption): SafeHtml {
    if (!text) {
      return '';
    }
    const safeInput = this.escapeHtml(text);
    const styledHtml = this.translator.applyStyling(safeInput, option);
    return this.sanitizer.bypassSecurityTrustHtml(styledHtml);
  }

  private escapeHtml(text: string): string {
    const lookup: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (s) => lookup[s]);
  }
}
