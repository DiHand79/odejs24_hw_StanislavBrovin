/*
 *  Home Work 1
 */

// 1
const inputData = 'Node.js course';
console.log(`String length: ${inputData.length}`);

//2
const inputNumber = 33;

function multTwo(number) {
  const count = number.toString().length;
  let result = number;

  for (let i = 0; i < count; i++) {
    result *= 2;
  }
  return result;
}

console.log(`Multiply result ${multTwo(inputNumber)} for ${inputNumber}`);
