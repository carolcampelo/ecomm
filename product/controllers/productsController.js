import products from "../models/product.js";

class ProductController {
    static listProducts = (req, res) => {
        products.find((err, products) => {
            if (err) {
                res.status(404).send({message: 'Products not found'})
            } else {
                res.status(200).json(products);
            }
        })
    }

    static listProductsById = (req, res) => {
        const id = req.params.id;

        products.findById(id, (err, products) => {
            if (err) {
                res.status(404).send({message: `${err.message} - ID Not Found.`})
            } else {
                res.status(200).json(products);
            }
        })
    }

    static addProducts = (req, res) => {
        let product = new products(req.body);
        product.save((err) => {
            if(err){
                res.status(401).send({message: `${err.message} - Access Denied.`})
            } else {
                res.status(201).send(product.toJSON())
            }
        })
    }
    
    static updateProducts = (req, res) => {
        const id = req.params.id;

        products.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (err) {
                res.status(401).send({message: `${err.message} - Access Denied.`})
            } else {
                res.status(200).json(products);
            }
        })
    }

    static deleteProducts = (req, res) => {
        const id = req.params.id;

        products.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(401).send({message: `${err.message} - Access Denied.`})
            } else {
                res.status(200).json(products);
            }
        })
    }
}

export default ProductController;