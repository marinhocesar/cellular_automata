const binary_to_decimal = require('../aux_functions').binary_to_decimal;
const decimal_to_binary = require('../aux_functions').decimal_to_binary;

test('binary to decimal', () => {
    expect(binary_to_decimal('00101'))
        .toBe(5);
    expect(binary_to_decimal('10000'))
        .toBe(16);
    expect(binary_to_decimal('100001'))
        .toBe(33);
});

test('unexpected value in binary_to_decimal arguments', () => {
    expect(binary_to_decimal('caio'))
        .toBe(-1);
    expect(binary_to_decimal('00100201'))
        .toBe(-1);
});

test('decimal to binary', () => {
    expect(decimal_to_binary(5))
        .toBe('101');
    expect(decimal_to_binary(6152))
        .toBe('1100000001000');
});

test('unexpected value in decimal_to_binary arguments', () => {
    expect(decimal_to_binary(-2))
        .toBe('');
     expect(decimal_to_binary('a'))
        .toBe('');
    expect(decimal_to_binary(0.2))
        .toBe('');
})