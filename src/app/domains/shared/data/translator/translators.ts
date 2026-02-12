import { LanguageOption } from '../language-option';

export type TranslationStrategy = {
  translate: (text: string) => string;
  isMatch: (text: string) => boolean;
  applyStyling: (text: string) => string;
};
const translateDefault: TranslationStrategy = {
  translate: (text: string): string => text,
  isMatch: (_text: string) => false,
  applyStyling: (text: string) => text,
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
  applyStyling: (text: string) => `<span class="text-black font-extrabold">${text}</span>`,
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
  applyStyling: (text) => text.replace(/tjilp/gi, '<i>tjilp</i>'),
};

const translatePapegaai: TranslationStrategy = {
  translate: (text) =>
    text
      .split('.')
      .map((line) => `Ik praat je na: ${line}`)
      .join('.'),
  isMatch: (text) => text.startsWith('Ik praat je na: '),
  applyStyling: (text) =>
    text
      .split('.')
      .filter((line) => line.trim().length > 0)
      .map((zin) =>
        zin
          .trim()
          .split(/\s+/)
          .map((word, i) => {
            const colorClass = i % 2 === 0 ? 'text-yellow-400' : 'text-blue-700';
            return `<span class="${colorClass}">${word}</span>`;
          })
          .join(' '),
      )
      .filter((line) => line.length > 0)
      .join('<br>'),
};
export const TRANSLATORS: Record<LanguageOption, TranslationStrategy> = {
  [LanguageOption.Labrador]: translateLabrador,
  [LanguageOption.Parkiet]: translateParkiet,
  [LanguageOption.Papegaai]: translatePapegaai,
  [LanguageOption.Mens]: translateDefault,
  [LanguageOption.AutoDetect]: translateDefault,
};
