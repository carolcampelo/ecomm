#! /bin/bash
mongoimport --uri "mongodb://admin:secret@mongo-ecomm:27017/?authSource=admin" --db ecomm-product --collection products --type=csv --file /mongo-seed/ecomm-produtos.csv --headerline
mongoimport --uri "mongodb://admin:secret@mongo-ecomm:27017/?authSource=admin" --db ecomm-product --collection categories --type=csv --file /mongo-seed/ecomm-categorias.csv --headerline
