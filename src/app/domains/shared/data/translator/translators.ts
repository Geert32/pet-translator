import { LanguageOption } from '../language-option';

export type TranslationFn = (text: string) => string;

const translateDefault: TranslationFn = (text: string): string => text;

const translateLabrador: TranslationFn = (text: string): string =>
  text
    .split(/\s+/)
    .map(() => 'woef')
    .join(' ');

const translateParkiet: TranslationFn = (text) => {
  const klinkers = ['a', 'e', 'i', 'o', 'u', 'y'];
  return text
    .split(/\s+/)
    .map((w) => (klinkers.includes(w[0]?.toLowerCase()) ? 'tjilp' : 'piep'))
    .join(' ');
};

const translatePapegaai: TranslationFn = (text) => `Ik praat je na: ${text}`;

export const TRANSLATORS: Record<LanguageOption, TranslationFn> = {
  [LanguageOption.Labrador]: translateLabrador,
  [LanguageOption.Parkiet]: translateParkiet,
  [LanguageOption.Papegaai]: translatePapegaai,
  [LanguageOption.Mens]: translateDefault,
  [LanguageOption.AutoDetect]: translateDefault,
};
