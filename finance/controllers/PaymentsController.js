const db = require('../models');
const DataValidations = require('../validations/DataValidation.js');

class PaymentsController {
    static async addPayments(req, res){
        const newPayment = req.body;
        newPayment.status = "CRIADO";
        let errors = [];

        DataValidations.cardNumberValidation(newPayment, errors);
        DataValidations.totalPriceValidation(newPayment, errors);
        DataValidations.cvvValidation(newPayment, errors);
        DataValidations.expDateValidation(newPayment, errors);

        if (errors.length == 0){ 
            try {
                const addNewPayment = await db.Payments.create(newPayment);
                const statusLinks = {
                    links: [
                        {
                            "rel": "CANCELADO",
                            method: "PATCH",
                            "href": `http://localhost:3000/payments/${addNewPayment.id}/CANCELADO`
                        },
                        {
                            "rel": "CONFIRMADO",
                            method: "PATCH",
                            "href": `http://localhost:3000/payments/${addNewPayment.id}/CONFIRMADO`
                        }
                    ]
                }

                await db.Payments.update(statusLinks, { where: { id: Number(addNewPayment.id) }});

                const payment = await db.Payments.findOne({ where: { id: Number(addNewPayment.id)}, attributes: {exclude: ['cvv']}});

                return res.status(200).location(`http://localhost:3000/payments/${addNewPayment.id}`).json(payment);
            } catch {
                return res.status(500).json({message: "Error"});
            }
        } else {
            return res.status(400).json(errors);
        }
    }

    static async getPaymentsById(req, res) {
        const { id } = req.params; 

        try {
            const paymentById = await db.Payments.findOne({
                where: {
                    id: Number(id)}, attributes: {exclude: ['cvv']}
                })
            return res.status(200).json(paymentById)
        } catch {
            return res.status(404).json({message: "ID Not Found"})
        }
        
    }

    static async updatePaymentStatus(req, res) {
        const { id } = req.params; 
        const newStatus = req.body;
        let errors = []

        DataValidations.newStatusValidation(newStatus, errors);  

        if (errors.length == 0){
            try {
                const paymentById = await db.Payments.findOne({
                    where: {
                        id: Number(id)}, attributes: {exclude: ['cvv']}
                    })
                    
                    if (paymentById.status == "CRIADO") {
                        try {
                            await db.Payments.update(newStatus, {where: {id: Number(id)}})
                            const updatedStatusPayment = await db.Payments.findOne({
                                where: {
                                    id: Number(id)}, attributes: {exclude: ['cvv']}
                                })  
                            return res.status(200).json(updatedStatusPayment);
                        } catch {
                            return res.status(500).json({message: "Failed to update payment status."})
                        }
                    } else {
                        return res.status(400).json({message: "Failed to update payment status. The initial value must be 'CRIADO'."})
                    }
            } catch {
                return res.status(404).json({message: "ID Not Found."})
            }
        } else {
            return res.status(400).json(errors);
        }
    } 

    static async updatePaymentStatusByLink(req, res){
        const {id, status} = req.params;

        try {
            await db.Payments.update({
                status: status
            }, {
                where: {
                    id: 
                        Number(id)
                }
            });
            const payment = await db.Payments.findOne({
                where: {
                    id: 
                        Number(id)
                }, 
                attributes: {
                    exclude: ['cvv', 'links']
                }
            })
            return res.status(200).json(payment)
        } catch {
            return res.status(500).json({message: 'Status update failed.'})
        }
    }
}

module.exports = PaymentsController;