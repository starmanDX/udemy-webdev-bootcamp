//File created and executed using Node terminal

function average(arr) {
    let result = 0;
    for(i=0;i<arr.length;i++) {
        result += arr[i];
    }
    result =  Math.round(result/arr.length)
    console.log(result)
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);