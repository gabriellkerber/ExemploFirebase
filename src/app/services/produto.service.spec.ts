import { TestBed } from '@angular/core/testing';

import { ProdutosService } from './produto.service';

describe('ProdutoService', () => {
  let service: ProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
