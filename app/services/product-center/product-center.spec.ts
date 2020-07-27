import { TestBed } from '@angular/core/testing';

import { ProductCenter } from './product-center';

describe('ProductCenter', () => {
  let service: ProductCenter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCenter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
