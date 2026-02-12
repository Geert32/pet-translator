import { LanguageOption } from './language-option';

export type TranslationRequest = {
  sourceText: string;
  fromLanguage: LanguageOption;
  toLanguage: LanguageOption;
};
