const db = require('../models');

class PaymentsController {
    static async addPayments(req, res){
        const newPayment = req.body;
        newPayment.status = "CRIADO";
        let errors = 0;

        function totalPriceValidation() {
            if (newPayment.totalPrice <= 0) { 
                errors++;
            }
        }
        
        function cardNumberValidation() {
            const cardNumberRegex = /^\d{16}$/;
            const cardNumberValidation = cardNumberRegex.test(newPayment.cardNumber);
            if (cardNumberValidation === false){ 
                errors++;
            }
        }

        function cvvValidation(){
            const cvvRegex = /^\d{3}$/;
            const cvvValidation = cvvRegex.test(newPayment.cvv);
            if (cvvValidation === false){ 
                errors++;
            }
        }

        function expDateValidation(){
            const expDateRegex = /^(20[2-9][0-9])-(0[1-9]|1[0-2])$/;
            const expDateValidation = expDateRegex.test(newPayment.expDate);
            if (expDateValidation === true){
                const year = parseInt((newPayment.expDate).slice(0,4));
                if (year > 2023){
                    return true;
                } else {
                    errors++;
                }
            } else {
                errors++;
            }
        }

        cardNumberValidation();
        totalPriceValidation();
        cvvValidation();
        expDateValidation();

        if (errors === 0){ 
            try {
                const addNewPayment = await db.Payments.create(newPayment);
                return res.status(200).location(`http://localhost:3000/payments/${addNewPayment.id}`).json(addNewPayment);
            } catch {
                return res.status(500).json(error.message);
            }
        } else {
            return res.json("Check your infos and try again.")
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

    static async changePaymentStatus(req, res) {
        const { id } = req.params; 
        const newStatus = req.body;
        let errors = 0;

        function statusValidation(){
            const statusRegex = /^(CRIADO|CONFIRMADO|CANCELADO)$/;
            const statusValidation = statusRegex.test(newStatus.status);
            if (statusValidation === false){ 
               errors++;
               return
            }
        }

        statusValidation();  

        if (errors === 0){
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
                        return res.status(400).json({message: "Failed to update payment status. The initial value must be 'CRIADO'"})
                    }
            } catch {
                return res.status(404).json({message: "ID Not Found."})
            }
        } else {
            return res.satuts(400).json({message: "Failed to update payment status. The initial value must be 'CRIADO', 'CANCELADO' or 'CONFIRMADO'"})
        }
    } 
}

module.exports = PaymentsController;