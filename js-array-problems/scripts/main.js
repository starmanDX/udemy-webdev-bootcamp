function printReverse(arr) {
    for (i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i])
    }
}

function isUniform(arr) {
    for (i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[0]) {
            return false;
        }
    }
    return true;
}

function sumArray(arr) {
    let sum = 0
    arr.forEach(function(x) {
        sum += x
    });
    return sum;
}

function max(arr) {
    let maxNum = arr[0]
    arr.forEach(function(x) {
        if(x > maxNum) {
            maxNum = x;
        }
    })
    return maxNum;
}