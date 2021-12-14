import { TestBed } from '@angular/core/testing';

import { SolutionResolver } from './solution.resolver';

describe('SolutionResolver', () => {
  let resolver: SolutionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SolutionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
