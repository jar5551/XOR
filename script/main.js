/**
 * Created by jarek on 15/01/16.
 */
window.onload = function () {
    var el = {
        form: document.getElementById('form'),
        jawny: document.getElementById('jawny'),
        klucz: document.getElementById('klucz'),
        output: document.getElementById('output'),
        //rozszyfruj: document.getElementById('rozszyfruj')
    };

    var toBin = function (input, moveIndex) {

        if(typeof moveIndex === 'undefined') {
            moveIndex = false;
        }

        var output = [];
        for (var i = 0; i < input.length; i++) {

            var compact = input.charCodeAt(i);
            if(moveIndex) {
                compact = parseInt(compact - 32);
            }
            compact = compact.toString(2);
            if(compact.length < 7) {
                var inputZeros = 7 - compact.length;
                var zeros = ''

                for(var j = 0; j < inputZeros; j++) {
                    zeros += '0';
                }

                compact = zeros + compact;
            }
            output.push(compact);
        }


        return output;
    };

    var binToStr = function (input, moveIndex) {

        if(typeof moveIndex === 'undefined') {
            moveIndex = false;
        }

        var output = '';

        if(moveIndex) {
            moveIndex = parseInt(0);
        } else {
            moveIndex = parseInt(32);
        }

        for (var i in input) {
            output += String.fromCharCode(parseInt(input[i], 2) + moveIndex);
        }

        return output;
    };

    var xor = function (inputA, inputB, decode) {
        if (inputA.length !== inputB.length) {
            alert('Klucz i tekst jawny/szyfr muszą być tej samej dłgości!');
            return false;
        }

        var output = new Array();
        inputA = toBin(inputA, decode);
        inputB = toBin(inputB);

        for (var i in inputA) {
            output[i] = '';

            for (var j = 0; j < 7; j++) {
                if (inputA[i].charAt(j) === inputB[i].charAt(j)) {
                    output[i] += 0;
                } else {
                    output[i] += 1;
                }
            }
        }

        output = binToStr(output, decode);

        return output;
    };

    var addMessage = function (msg, decode) {
        if(typeof decode === 'undefined') {
            decode = false;
        }

        if(decode) {
            el.jawny.value = msg;
        } else {
            el.output.value = msg;
        }
    };



    el.form.addEventListener('submit', function (e) {
        e.preventDefault();

        var result = xor(el.jawny.value, el.klucz.value, false);
        if (result) {
            addMessage(result);
        }
    });

    //el.rozszyfruj.addEventListener('click', function (e) {
    //    e.preventDefault();
    //
    //    var result = xor(el.output.value, el.klucz.value, true);
    //
    //    if (result) {
    //        addMessage(result, true);
    //    }
    //});
};
