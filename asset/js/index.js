console.log("My asset script is running");

const colorMapper={
    Personal:'violet' ,
    Work:'Orange',
    School:'Purple',
    Cleaning:'Green',
    Other:'darkyellow'
}

// console.log(typeof(colorMapper));
let element = document.getElementsByClassName('display-category');
// console.log(typeof(element));
// element[0].style.backgroundColor='red';
let catg= element[0].innerText;
a=catg;
console.log(element[0].innerHTML);
console.log(catg);
console.log(colorMapper[a]);

for(let i =0;i<Object.keys(element).length;i++){
    let catg= element[i].innerText;
    element[i].style.backgroundColor=colorMapper[catg];
}
