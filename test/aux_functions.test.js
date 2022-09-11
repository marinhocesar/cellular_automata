let aux_functions = require('../aux_functions');

test('binary to decimal', () => {
    expect(aux_functions.binary_to_decimal('00101'))
        .toBe(5);
    expect(aux_functions.binary_to_decimal('10000'))
        .toBe(16);
    expect(aux_functions.binary_to_decimal('100001'))
        .toBe(33);
});

test('unexpected value in binary_to_decimal arguments', () => {
    expect(aux_functions.binary_to_decimal('caio'))
        .toBe(-1);
    expect(aux_functions.binary_to_decimal('00100201'))
        .toBe(-1);
});

test('decimal to binary', () => {
    expect(aux_functions.decimal_to_binary(5))
        .toBe('101');
    expect(aux_functions.decimal_to_binary(6152))
        .toBe('1100000001000');
});

test('unexpected value in decimal_to_binary arguments', () => {
    expect(aux_functions.decimal_to_binary(-2))
        .toBe('');
     expect(aux_functions.decimal_to_binary('a'))
        .toBe('');
    expect(aux_functions.decimal_to_binary(0.2))
        .toBe('');
})