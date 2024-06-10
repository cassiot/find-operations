var ops = ['+', '-', '*', '/'];

function findOperations(nums) {
    var opsPermut = permute(ops);
    var numsPermut = permute(nums);

    var exprArr = [];

    var totals1 = new Array(MaxSolution).fill(0), totals2 = new Array(MaxSolution).fill(0);

    for (var i = 0; i < numsPermut.length; i++) {
        var numArr = numsPermut[i];

        for (var j = 0; j < opsPermut.length; j++) {
            var opsArr = opsPermut[j];
            var expr = '';

            for (var k = 0; k < opsArr.length; k++) {
                expr += numArr[k] + opsArr[k];
            }

            expr += numArr[numArr.length - 1];
            exprArr.push(expr);
        }
    }

    for (var j = 0; j < exprArr.length; j++) {
        var expr1 = exprArr[j];
        var expr2 = '-' + expr1;

        var value1 = eval(expr1);
        var value2 = eval(expr2);

        if (Number.isInteger(value1)) {
            totals1[value1]++;
            // console.log(expr1 + '= ' + value1);
        }
        if (Number.isInteger(value2)) {
            totals2[value2]++;
            // console.log(expr2 + '= ' + value2);
        }
    }

    return [totals1, totals2]
}

function print(totals1, totals2) {
    console.log('Total solutions');
    console.log('       Expr    -Expr      Sum');

    for (var i = 0; i < MaxSolution; i++) {
        //if(totals1[i] > 0 || totals2[i] > 0)
            console.log(`${String(i).padStart(2, ' ')}:     ${String(totals1[i]).padStart(3, ' ')}      ${String(totals2[i]).padStart(3, ' ')}      ${String(totals1[i] + totals2[i]).padStart(3, ' ')}`);
    }
}

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

var MaxSolution = 22;

var [totals1, totals2] = findOperations([1, 2, 3, 4, 5]);
print(totals1, totals2);

// MaxSolution = 15
// var [totals1, totals2] = findOperations([0, 1, 2, 3, 4]);
// print(totals1, totals2);

// MaxSolution = 100;
// var [totals1, totals2] = findOperations([1, 3, 5, 7, 11]); //only primes
// print(totals1, totals2);

// MaxSolution = 1000
// var [totals1, totals2] = findOperations([11, 13, 23, 31, 41]); // bigger primes -- Only 0's
// print(totals1, totals2);

// MaxSolution = 1000
// var [totals1, totals2] = findOperations([14, 24, 30, 32, 42]);
// print(totals1, totals2);


