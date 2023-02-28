import categories from '../models/category.js';

class CategoryController {
  static listCategories = (req, res) => {
    categories.find((err, categories) => {
      if (err) {
        res.status(404).send({ message: 'Categories not found' });
      } else {
        res.status(200).json(categories);
      }
    });
  };

  static listCategoriesById = (req, res) => {
    const { id } = req.params;

    categories.findById(id, (err, categories) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - ID Not Found.` });
      } else {
        res.status(200).json(categories);
      }
    });
  };

  static addCategories = (req, res) => {
    const category = new Categories(req.body);
    category.save((err) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Add category failed.` });
      } else {
        res.status(201).send(category.toJSON());
      }
    });
  };

  static updateCategories = (req, res) => {
    const { id } = req.params;

    categories.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(categories);
      }
    });
  };

  static activateCategories = (req, res) => {
    const { id } = req.params;

    categories.findByIdAndUpdate(id, { $set: { status: true } }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(categories);
      }
    });
  };

  static deleteCategories = (req, res) => {
    const { id } = req.params;

    categories.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(categories);
      }
    });
  };
}

export default CategoryController;
