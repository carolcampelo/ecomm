import Product from '../models/product.js';

class ProductController {
  static findProducts = (req, res) => {
    Product.find((err, product) => {
      if (err) {
        res.status(404).send({ message: 'Products not found' });
      } else {
        res.status(200).json(product);
      }
    });
  };

  static findProductById = (req, res) => {
    const { id } = req.params;

    Product.findById(id, (err, product) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - ID Not Found.` });
      } else {
        res.status(200).json(product);
      }
    });
  };

  static addProduct = (req, res) => {
    const product = new Product(req.body);
    product.save((err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(201).send(product.toJSON());
      }
    });
  };

  static updateProduct = (req, res) => {
    const { id } = req.params;

    Product.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(Product);
      }
    });
  };

  static deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(401).send({ message: `${err.message} - Access Denied.` });
      } else {
        res.status(200).json(Product);
      }
    });
  };
}

export default ProductController;
