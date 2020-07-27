import { TestBed } from '@angular/core/testing';

import { FABRIK_NAME_FIRST_LETTER_CAPITALIZED } from './FABRIK_NAME_SLUGIFIED';

describe('FABRIK_NAME_FIRST_LETTER_CAPITALIZED', () => {
  let service: FABRIK_NAME_FIRST_LETTER_CAPITALIZED;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FABRIK_NAME_FIRST_LETTER_CAPITALIZED);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
