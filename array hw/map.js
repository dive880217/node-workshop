//只要是array.函式()都是0(n)
let array = [1, 4, 9, 16 , 25 ,36 ,100 ,50];
function map() {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        // newArr.push(Math.sqrt(array[i]));
        newArr[i] = Math.sqrt(array[i]);
    }
    console.log(newArr);
}
map();