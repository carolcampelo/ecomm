const db = require('../models');
const DataValidations = require('../validations/DataValidation.js');
const {HOST, PORT, STATUS} = require('../utils/constants.js');

class PaymentsController {
    static async addPayments(req, res){
        const newPayment = req.body;
        newPayment.status = STATUS.criado;
        let errors = [];

        DataValidations.cardNumberValidation(newPayment, errors);
        DataValidations.totalPriceValidation(newPayment, errors);
        DataValidations.cvvValidation(newPayment, errors);
        DataValidations.expDateValidation(newPayment, errors);

        if (errors.length != 0){ 
            return res.status(400).json(errors);
        }

        try {
            const payment = await db.Payments.create(newPayment);
            const statusLinks = [
                    {
                        "rel": "CANCELADO",
                        method: "PATCH",
                        "href": `http://${HOST}:${PORT}/payments/${payment.id}/CANCELADO`
                    },
                    {
                        "rel": "CONFIRMADO",
                        method: "PATCH",
                        "href": `http://${HOST}:${PORT}/payments/${payment.id}/CONFIRMADO`
                    }
                ];
        
            payment.links = statusLinks;

            return res.status(200).location(`http://${HOST}:${PORT}/payments/${payment.id}`).json(payment);
        } catch {
            return res.status(500).json({message: "Error"});
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

        if (errors.length != 0){
            return res.status(400).json(errors);
        }

        try {
            const paymentById = await db.Payments.findOne({
                where: {
                    id: Number(id)}, attributes: {exclude: ['cvv']}
                })
                
                if (paymentById.status === STATUS.criado) {
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
    } 

    static async updatePaymentStatusByLink(req, res){
        const {id, status} = req.params;
        const invoiceData = { ...req.body, paymentId: Number(id)};

        const paymentById = await db.Payments.findOne({where: {id: Number(id)}});

        console.log(paymentById.status);
        console.log(STATUS.criado);

        if (paymentById.status != STATUS.criado) {
            return res.status(405).json({message: "Initial status must be 'CRIADO'."})
        }

        try {
            await db.Payments.update({
                status: status
            }, {
                where: {
                    id: 
                        Number(id)
                }
            });

            if (status === STATUS.confirmado) {
                const invoice = await db.Invoices.create(invoiceData)
                await db.Payments.update({
                    invoiceId: invoice.id
                },
                {
                    where: {
                        id: 
                            Number(id)
                    }
                })
            }

            const payment = await db.Payments.findOne({
                where: {
                    id: 
                        Number(id)
                }, 
                attributes: {
                    exclude: ['cvv', 'links']
                }
            })

            console.log(payment)
            return res.status(200).json(payment)
        } catch {
            return res.status(500).json({message: 'Status update failed.'})
        }
    }
}

module.exports = PaymentsController;