import { LanguageOption } from '../language-option';

export type TranslationStrategy = {
  translate: (text: string) => string;
  isMatch: (text: string) => boolean;
};
const translateDefault: TranslationStrategy = {
  translate: (text: string): string => text,
  isMatch: (_text: string) => false,
};

const translateLabrador: TranslationStrategy = {
  translate: (text: string): string =>
    text
      .split(/\s+/)
      .map(() => 'woef')
      .join(' '),
  isMatch: (text: string) =>
    text
      .toLowerCase()
      .split(' ')
      .every((w) => w === 'woef'),
};

const translateParkiet: TranslationStrategy = {
  translate: (text) => {
    const klinkers = ['a', 'e', 'i', 'o', 'u', 'y'];
    return text
      .split(/\s+/)
      .map((w) => (klinkers.includes(w[0]?.toLowerCase()) ? 'tjilp' : 'piep'))
      .join(' ');
  },
  isMatch: (text) => /^(\s*(tjilp|piep)\s*)+$/i.test(text),
};

const translatePapegaai: TranslationStrategy = {
  translate: (text) => `Ik praat je na: ${text}`,
  isMatch: (text) => text.startsWith('Ik praat je na: '),
};
export const TRANSLATORS: Record<LanguageOption, TranslationStrategy> = {
  [LanguageOption.Labrador]: translateLabrador,
  [LanguageOption.Parkiet]: translateParkiet,
  [LanguageOption.Papegaai]: translatePapegaai,
  [LanguageOption.Mens]: translateDefault,
  [LanguageOption.AutoDetect]: translateDefault,
};
