function luhnAlgorithm(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    const oddDigits = digits.filter((_, idx) => (digits.length - idx) % 2 === 1);
    const evenDigits = digits.filter((_, idx) => (digits.length - idx) % 2 === 0);

    const checksum = oddDigits.reduce((sum, digit) => sum + digit, 0) +
        evenDigits.reduce((sum, digit) => {
            const doubled = digit * 2;
            return sum + (doubled > 9 ? doubled - 9 : doubled);
        }, 0);

    return checksum % 10 === 0;
}

function getCardIssuer(cardNumber) {
    const cardPatterns = {
        "Visa": /^4[0-9]{12}(?:[0-9]{3})?$/,
        "MasterCard": /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/,
        "Elo": /^(4011|4312|4389|5041|5066|5090|6277|6362|6363|6500|6504|6505|6516|6550)[0-9]{12}$/,
        "American Express": /^3[47][0-9]{13}$/,
        "Discover": /^(6011|65[0-9]{2}|64[4-9][0-9])[0-9]{12}$/,
        "Hipercard": /^606282|3841[0-9]{15}$/,
        "Diners Club": /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        "EnRoute": /^(2014|2149)[0-9]{11}$/,
        "Voyager": /^8699[0-9]{11}$/,
        "Aura": /^50[0-9]{14}$/
    };

    for (const [issuer, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            return issuer;
        }
    }
    return "Unknown";
}

function validateCreditCard(cardNumber) {
    if (!luhnAlgorithm(cardNumber)) {
        return "Número de cartão inválido";
    }

    return getCardIssuer(cardNumber);
}

// Exemplo de uso
const cardNumber = "5093178522328146";
const result = validateCreditCard(cardNumber);
console.log(`O número do cartão ${cardNumber} pertence à bandeira: ${result}`);