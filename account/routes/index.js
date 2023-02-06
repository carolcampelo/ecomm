import express from 'express';
import users from './usersRoutes.js';
// import products from './productsRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "E-comm Project"})
    })

    app.use(
        express.json(),
        users
    )
}

export default routes;