import { TestBed } from '@angular/core/testing';

import { FormDataParserService } from './form-data-parser.service';

describe('FormDataParserService', () => {
  let service: FormDataParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
