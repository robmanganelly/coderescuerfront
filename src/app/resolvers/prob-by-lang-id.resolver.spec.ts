import { TestBed } from '@angular/core/testing';

import { ProbByLangIdResolver } from './prob-by-lang-id.resolver';

describe('ProbByLangIdResolver', () => {
  let resolver: ProbByLangIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProbByLangIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
