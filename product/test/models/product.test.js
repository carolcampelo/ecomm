import { describe, expect, it } from '@jest/globals';
import Product from '../../src/models/product.js';

describe('Product model test', () => {
  const objectProduct = {
    name: 'iPhone 11 Apple 64GB Branco 6,1” 12MP iOS',
    description: 'Grave vídeos 4K, faça belos retratos e capture paisagens inteiras com o novo sistema de câmera dupla. Tire fotos incríveis com pouca luz usando o modo Noite. Veja cores fiéis em fotos, vídeos e jogos na tela Liquid Retina de 6,1 polegadas. Leve o desempenho sem precedentes do chip A13 Bionic para seus games, realidade aumentada e fotografia. Faça muito e recarregue pouco com a bateria para o dia todo. E conte com resistência à água de até dois metros por até 30 minutos',
    slug: 'iphone-11-apple-64gb-branco-61-12mp-ios',
    price: Object({ $numberDecimal: '3399.99' }),
    quantityInStock: 10,
    category: 'celulares',
  };

  it('Should initiate a new product', () => {
    const product = new Product(objectProduct);

    expect(product.name).toEqual(objectProduct.name);
    expect(product.description).toEqual(objectProduct.description);
    expect(product.quantityInStock).toEqual(objectProduct.quantityInStock);
  });
});
