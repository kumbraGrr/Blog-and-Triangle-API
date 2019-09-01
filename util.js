exports.stringToNum = (point) => {
    let temp = [];
//Split strings based on comma
if(point === undefined){
  return false;
}
point = point.split(",");
if (point.length > 2 || point.length < 2) return false; //Chekc if user entered more than two values
point.forEach((p, i) => {
  if (p % 1 === 0) {
    //If its a round number use parseInt
    temp[i] = parseInt(p);
  } else temp[i] = parseFloat(p); //If its a decimal number use parseFloat
});
return temp;
}

exports.lineLng = (point1, point2) => {
    let result = Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2)); //Measure lengths of lines
    //Round the number without converting it to a string. Reference : https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string
    Number.prototype.toFixedNumber = function(x, base){
      var pow = Math.pow(base||10,x);
      return Math.round(this*pow) / pow;
    }
    return result.toFixedNumber(2);
  }

exports.checking = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (isNaN(arr[i][0]) || isNaN(arr[i][1]))
        //If any of the values is NaN Incorrect triangle will be returned
        return false;
    }
    return true;
}

exports.check = (arr1, arr2) => {
  for(var i = arr1.length; i--;) {
    if(arr1[i] !== arr2[i])
        return true; //If none of the points are the same
  }
  return false; //If some of the points are the same
}

exports.compare = (a, b, c) => {
    if (a === b && b === c) {
      return "Equilateral";
    } else if (
      (a === b && a !== c) ||
      (b === c && b !== a) ||
      (a === c && a !== b)
    ) {
      return "Isosceles";
    } else {
      return "Scalene";
    }
  }