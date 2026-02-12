import { Translator } from './translator';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/vitest';
import { LanguageOption } from '../language-option';

describe('Translator', () => {
  let spectator: SpectatorService<Translator>;

  const createService = createServiceFactory(Translator);

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('translate labrador', () => {
    it.each([
      ['ik ben een mens', 'woef woef woef woef'],
      ['woord', 'woef'],
      ['', ''],
      [' ', ''],
      [null, ''],
    ])('should translate %s to %s', (input, expected) => {
      expect(spectator.service.translate(input, LanguageOption.Labrador)).toBe(expected);
    });
  });

  describe('translate parkiet', () => {
    it.each([
      ['ik ben een mens', 'tjilp piep tjilp piep'],
      ['a e i o u y', 'tjilp tjilp tjilp tjilp tjilp tjilp'],
      [
        'b c d f g h j k l m n p q r s t v w x z',
        'piep piep piep piep piep piep piep piep piep piep piep piep piep piep piep piep piep piep piep piep',
      ],
      ['ik ben een mens', 'tjilp piep tjilp piep'],
      ['woord', 'piep'],
      ['', ''],
      [' ', ''],
      [null, ''],
    ])('should translate %s to %s', (input, expected) => {
      expect(spectator.service.translate(input, LanguageOption.Parkiet)).toBe(expected);
    });
  });

  describe('translate papegaai', () => {
    it.each([
      ['ik ben een mens', 'Ik praat je na: ik ben een mens'],
      ['woord', 'Ik praat je na: woord'],
      ['', ''],
      [' ', ''],
      [null, ''],
    ])('should translate %s to %s', (input, expected) => {
      expect(spectator.service.translate(input, LanguageOption.Papegaai)).toBe(expected);
    });
  });
});
