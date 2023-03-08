import { describe, expect, it } from '@jest/globals';
import categories from '../../models/category.js';

describe('Category model test', () => {
  const objectCategory = {
    name: 'tecnologia',
    status: false,
  };

  it('Should initiate a new category', () => {
    const category = new categories(objectCategory);
    expect(category).toEqual(expect.objectContaining(objectCategory));
  });
});
