/* Shorter version -
function isEven(num) {
    return num % 2 === 0;
} */

function isEven(num) {
    if(num % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isEven(2));
console.log(isEven(3));

/* Shorter version -
function factorial(num) {
    let result = 1
    for(i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
 } */

function factorial(num) {
   if(num===0 || num===1) {
       return 1;
   }
   for(i=num-1;i>=1;i--) {
       num *= i;
   }
   return num;
}

console.log(factorial(4));
console.log(factorial(10));
console.log(factorial(0));

/* Shorter version w/ regex -
function kebabToSnake(str) {
    var result = str.replace(/-/g, "_");
    return result
} */

function kebabToSnake(str) {
    let result = str
    while(result.indexOf("-") !== -1) {
        result = result.replace("-","_");
    }
    return result;
}

console.log(kebabToSnake("hello-there-world"))
console.log(kebabToSnake("hello-there"))
console.log(kebabToSnake("hello"))