import { TestBed } from '@angular/core/testing';

import { LangResolver } from './lang.resolver';

describe('LangResolver', () => {
  let resolver: LangResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LangResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
