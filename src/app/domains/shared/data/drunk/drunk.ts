import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Drunk {
  drankToMuch(text: string): string {
    const words = text.split(/\s+/);

    const modifiedWords = words.map((word, index) => {
      if ((index + 1) % 4 === 0) {
        return word.split('').reverse().join('');
      }
      return word;
    });

    return `${modifiedWords.join(' ')} Burp!`;
  }
}
