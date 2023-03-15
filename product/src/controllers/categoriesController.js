import Category from '../models/category.js';

class CategoryController {
  static listCategories = (req, res) => {
    Category.find((err, category) => {
      if (err) {
        res.status(404).send({ message: 'Categories not found' });
      } else {
        res.status(200).json(category);
      }
    });
  };

  static listCategoryById = (req, res) => {
    const { id } = req.params;

    Category.findById(id, (err, category) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - ID Not Found.` });
      } else {
        res.status(200).json(category);
      }
    });
  };

  static addCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Add category failed.` });
      } else {
        res.status(201).send(category.toJSON());
      }
    });
  };

  static updateCategory = (req, res) => {
    const { id } = req.params;

    Category.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(Category);
      }
    });
  };

  static activateCategory = (req, res) => {
    const { id } = req.params;

    Category.findByIdAndUpdate(id, { $set: { status: true } }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(Category);
      }
    });
  };

  static deleteCategory = (req, res) => {
    const { id } = req.params;

    Category.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(Category);
      }
    });
  };
}

export default CategoryController;
