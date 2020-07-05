import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('line', (line: string): void => {
    const validInput: number[] = validateInput(line)

    if (isLuhnNumber(validInput)) {
        result(true, 'The number is valid')
    }

    result(false, 'The number is not valid')
})

function validateInput(input: string): number[] {
    const noSpaces = input.replace(/\s/g, '')
    const isNum = /^\d+$/.test(noSpaces)
    const isShort = noSpaces.length <= 1

    if (!isNum) {
        result(false, "Input contains a character that is not a digit")
    }

    if (isShort) {
        result(false, "Strings of length 1 or less are not valid")
    }

    return noSpaces.split('').map(Number)
}

function isLuhnNumber(nums: number[]): boolean {
    let luhnNums = [...nums]
    for (let i = luhnNums.length - 2; i > -1; i = i - 2) {
        const doubledDigit = 2 * luhnNums[i]
        luhnNums[i] = (doubledDigit > 9) ? ( doubledDigit - 9) : (doubledDigit)
    }
    let numsSum = luhnNums.reduce((a, b) => a + b, 0)
    return numsSum % 10 == 0
}

function result(isValid: boolean, comment: string): void {
    if (isValid) {
        console.log("The number is valid")
        process.exit(0)
    } else {
        console.log("The number is not valid: " + comment)
        process.exit(42)
    }
}

