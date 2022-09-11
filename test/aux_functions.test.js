let aux_functions = require('../aux_functions');

test('decimal from binary', () => {
    expect(aux_functions.binary_to_decimal('00101'))
        .toBe(5);
    expect(aux_functions.binary_to_decimal('10000'))
        .toBe(16);
    expect(aux_functions.binary_to_decimal('100001'))
        .toBe(33);
});

test('illegal value in binary_to_decimal argument', () => {
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

test('illegal value in decimal_to_binary argument', () => {
    expect(aux_functions.decimal_to_binary(-2))
        .toBe('');
     expect(aux_functions.decimal_to_binary('a'))
        .toBe('');
    expect(aux_functions.decimal_to_binary(0.2))
        .toBe('');
})