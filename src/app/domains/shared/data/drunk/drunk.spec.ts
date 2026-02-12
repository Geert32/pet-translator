import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Drunk } from './drunk';

describe('Drunk Service', () => {
  let spectator: SpectatorService<Drunk>;

  const createService = createServiceFactory(Drunk);

  beforeEach(() => (spectator = createService()));

  it('should always append "Burp!" to the end', () => {
    const result = spectator.service.drankToMuch('hello');
    expect(result).toMatch(/Burp!$/);
  });

  it('should reverse every 4th word', () => {
    const input = 'one two three four';
    const result = spectator.service.drankToMuch(input);

    expect(result).toBe('one two three ruof Burp!');
  });

  it('should handle multiple reversals in a long sentence', () => {
    const input = 'the quick brown fox jumps over the lazy dog';
    const result = spectator.service.drankToMuch(input);

    expect(result).toBe('the quick brown xof jumps over the yzal dog Burp!');
  });

  it('should not reverse anything if there are fewer than 4 words', () => {
    const input = 'i am drunk';
    const result = spectator.service.drankToMuch(input);
    expect(result).toBe('i am drunk Burp!');
  });

  it('should reverse punctuation attached to the 4th word', () => {
    const input = 'wait for it... now!';
    const result = spectator.service.drankToMuch(input);

    expect(result).toBe('wait for it... !won Burp!');
  });

  it('should handle multiple spaces correctly (ignoring empty strings in count)', () => {
    const input = 'one  two   three    four';
    const result = spectator.service.drankToMuch(input);

    expect(result).toBe('one two three ruof Burp!');
  });
});
