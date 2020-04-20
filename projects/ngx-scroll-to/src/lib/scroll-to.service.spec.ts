import { Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { ScrollToService } from './scroll-to.service';

class MockDocument { }
class MockPlatform { }

describe('ScrollToService', () => {

  let service: ScrollToService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT, useClass: MockDocument
        },
        {
          provide: PLATFORM_ID, useClass: MockPlatform
        },
        ScrollToService
      ]
    });

    service = TestBed.inject(ScrollToService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a public function called `scrollTo`', () => {
    expect(service.scrollTo instanceof Function).toBe(true);
  });
});
