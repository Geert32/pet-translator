import { LanguageOption } from './language-option';

export const LANGUAGE_MAP: Record<LanguageOption, LanguageOption[]> = {
  [LanguageOption.Mens]: [LanguageOption.Labrador, LanguageOption.Parkiet, LanguageOption.Papegaai],
  [LanguageOption.Labrador]: [LanguageOption.Parkiet, LanguageOption.Papegaai],
  [LanguageOption.Parkiet]: [LanguageOption.Labrador, LanguageOption.Papegaai],
  [LanguageOption.AutoDetect]: [
    LanguageOption.Labrador,
    LanguageOption.Parkiet,
    LanguageOption.Papegaai,
  ],
  [LanguageOption.Papegaai]: [LanguageOption.Labrador, LanguageOption.Parkiet, LanguageOption.Mens],
};
