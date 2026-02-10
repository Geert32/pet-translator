import { TranslationOption } from './translation-option';

export type TranslationRequest = {
  sourceText: string;
  fromLanguage: TranslationOption;
  toLanguage: TranslationOption;
};
