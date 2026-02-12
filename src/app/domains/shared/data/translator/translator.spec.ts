import { TestBed } from '@angular/core/testing';

import { Translator } from './translator';

describe('Translator', () => {
  let service: Translator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Translator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
