function decimal_to_binary(decimal) {
    let remaining;


}

function binary_to_decimal(binary_str) {
    console.log(typeof binary_str)
    if (typeof binary_str != "string")
    {
        return -1;
    }
    
    let binary_split = binary_str.split('');
    let valid_digits = ['0', '1'];
    
    for (let char of binary_split) {

        if (!valid_digits.includes(char)) {
            return -1;
        }
    }

    let decimal_number = 0;
    let power = 0;

    while (binary_split != '') {
        let last_digit = parseInt(binary_split.pop());
        decimal_number += last_digit*Math.pow(2, power);
        power += 1;
    }
    console.log(decimal_number)
    return decimal_number;
}

exports.binary_to_decimal = binary_to_decimal;