class DataValidations {

    static totalPriceValidation(newPayment, errors) {
        if (newPayment.totalPrice <= 0) { 
            return errors.push("Total Price is invalid. Must be greater than 0.");
        }
    }
    
    static cardNumberValidation(newPayment, errors) {
        const cardNumberRegex = /^\d{16}$/;
        const cardNumberValidation = cardNumberRegex.test(newPayment.cardNumber);
        if (cardNumberValidation === false){ 
            return errors.push("Invalid card number. Must have 16 digits.");
        }
    }

    static cvvValidation(newPayment, errors){
        const cvvRegex = /^\d{3}$/;
        const cvvValidation = cvvRegex.test(newPayment.cvv);
        if (cvvValidation === false){ 
            return errors.push("Invalid CVV number. Must have 3 digits.");
        }
    }

    static expDateValidation(newPayment, errors){
        const expDateRegex = /^(20[2-9][0-9])-(0[1-9]|1[0-2])$/;
        const expDateValidation = expDateRegex.test(newPayment.expDate);
        if (expDateValidation === true){
            const year = parseInt((newPayment.expDate).slice(0,4));
            if (year > 2023){
                return true;
            } else {
                return errors.push("The expiration year must be greater than 2023.");
            }
        } else {
            return errors.push("Check the expiration date. Must be YYYY-mm.");
        }
    }

    static newStatusValidation(newStatus, errors){
        const statusRegex = /^(CRIADO|CONFIRMADO|CANCELADO)$/;
        const statusValidation = statusRegex.test(newStatus.status);
        if (statusValidation === false){ 
           return errors.push("Failed to update payment status. The new value must be 'CRIADO', 'CANCELADO' or 'CONFIRMADO'");
        }
    }

}

module.exports = DataValidations;