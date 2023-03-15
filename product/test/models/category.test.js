import { describe, expect, it } from '@jest/globals';
import Category from '../../src/models/category.js';

describe('Category model test', () => {
  const objectCategory = {
    name: 'tecnologia',
    status: false,
  };

  it('Should initiate a new category', () => {
    const category = new Category(objectCategory);
    expect(category).toEqual(expect.objectContaining(objectCategory));
  });
});
