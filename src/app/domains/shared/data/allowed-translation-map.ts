import { TranslationOption } from './translation-option';

export const TRANSLATION_MAP: Record<TranslationOption, TranslationOption[]> = {
  [TranslationOption.Mens]: [
    TranslationOption.Labrador,
    TranslationOption.Parkiet,
    TranslationOption.Papegaai,
  ],
  [TranslationOption.Labrador]: [TranslationOption.Parkiet, TranslationOption.Papegaai],
  [TranslationOption.Parkiet]: [TranslationOption.Labrador, TranslationOption.Papegaai],
  [TranslationOption.AutoDetect]: [],
  [TranslationOption.Papegaai]: [
    TranslationOption.Labrador,
    TranslationOption.Parkiet,
    TranslationOption.Papegaai,
    TranslationOption.Mens,
  ],
};
