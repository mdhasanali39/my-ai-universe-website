// let's try something about date 
const date = new Date('11/1/2022').getTime()
console.log(typeof date);
// const milliseconds = date;
const date2 = new Date('12/1/2022').getTime()
console.log(date2);
if(date < date2){
    console.log('yes');
}else{
    console.log('no');
}