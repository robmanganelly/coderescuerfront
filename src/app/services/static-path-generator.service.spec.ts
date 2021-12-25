import { TestBed } from '@angular/core/testing';

import { StaticPathGeneratorService } from './static-path-generator.service';

describe('StaticPathGeneratorService', () => {
  let service: StaticPathGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticPathGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
