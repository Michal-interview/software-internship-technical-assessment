"use strict";
exports.__esModule = true;
var readline = require("readline");
/* Does not work for the test, but trying indivdual inputs gives the correct result

rl.question('Please enter the number : ', (answer) => {
    let validInput = validateInput(answer)
    if (luhnAlgorithm(validInput)) {
        exit(true, 'The number given is not valid')
    } else {
        exit(false, 'The number given is not valid')
    }
    rl.close()
})
*/
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function (line) {
    var validInput = validateInput(line);
    if (luhnAlgorithm(validInput)) {
        result(true, 'The number is valid');
    }
    else {
        result(false, 'The number is not valid');
    }
});
function validateInput(input) {
    var noSpaces = input.replace(/\s/g, '');
    var isNum = /^\d+$/.test(noSpaces);
    if (!isNum)
        result(false, "Input contains a character that is not a digit");
    var isShort = noSpaces.length <= 1;
    if (isShort)
        result(false, "Strings of length 1 or less are not valid");
    return noSpaces.split('').map(Number);
}
function luhnAlgorithm(nums) {
    var luhnNums = nums;
    for (var i = nums.length - 2; i > -1; i = i - 2) {
        var doubledDigit = 2 * luhnNums[i];
        luhnNums[i] = (doubledDigit > 9) ? (doubledDigit - 9) : (doubledDigit);
    }
    var numsSum = luhnNums.reduce(function (a, b) { return a + b; }, 0);
    return numsSum % 10 == 0;
}
function result(isValid, comment) {
    if (isValid) {
        console.log("The number is valid");
        process.exit(0);
    }
    else {
        console.log("The number is not valid: " + comment);
        process.exit(42);
    }
}
