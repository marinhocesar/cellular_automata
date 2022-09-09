let func = require('../aux_functions');

let test = require('unit.js');

describe('testing aux_functions', function(){
    it('binary to decimal', function(){
        test
        .when(answer = func.binary_to_decimal('00001')).assert(answer == 1)
        // .when(answer = func.binary_to_decimal('af9301')).assert(answer == -1)
    })


})


