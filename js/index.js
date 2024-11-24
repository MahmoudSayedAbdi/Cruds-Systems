// input
var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discound = document.getElementById("discound");
var total = document.getElementById("total");
var count = document.getElementById("count")
var category = document.getElementById("category");
// Btn
var create = document.getElementById("create");
var deleteAll = document.getElementById("deleteAll");
// body
var tBody = document.querySelector(".outputs tbody")

// global var
var mood = "create"
var temp ;


// get total 
price.addEventListener("keyup" , getTotal);
taxes.addEventListener("keyup" , getTotal);
ads.addEventListener("keyup" , getTotal);
discound.addEventListener("keyup" , getTotal);

function getTotal() {
    if(price.value != "")
    {
        var result;
        result = (+price.value + +taxes.value + +ads.value ) - +discound.value ;
        total.innerHTML = result;
        total.style.backgroundColor = "#040"
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a10b42"
    }
}

// Create
create.addEventListener("click", addProdect)

var prodectList = [];

if(localStorage.getItem("dataList") != null){
    prodectList = JSON.parse(localStorage.getItem("dataList"))
}

function addProdect(){

    var prodect = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        total :total.innerHTML,
        discound : discound.value,
        count : count.value,
        category :category.value,
    } ;

    if(mood == "create"){
        if(prodect.count >1){
            for(var i =0 ; i< prodect.count ; i++){
                prodectList.push(prodect);
            }
            }
            else{
                prodectList.push(prodect);            
            }
    }else{
        prodectList[temp] = prodect
        create.innerHTML = "Create"
        count.style.display = "block"
        mood = "create"
    }
    localStorage.setItem("dataList", JSON.stringify(prodectList))
    clearForm()
    display()
    
}


// clear form 
function clearForm (){
    title.value = "";
    price.value= "";
    taxes.value = "";
    ads.value = "";
    total.innerHTML = "";
    discound.value = "";
    count.value = ""
    category.value = "";
};


// read 

function display() {
    getTotal()
    // to display element
    temp =``;
    for(var i=0 ;i<prodectList.length ; i++){
        temp += `
            <tr>
                <td>${i}</td>
                <td>${prodectList[i].title}</td>
                <td>${prodectList[i].price}</td>
                <td>${prodectList[i].taxes}</td>
                <td>${prodectList[i].ads}</td>
                <td>${prodectList[i].discound}%</td>
                <td>${prodectList[i].total}</td>
                <td>${prodectList[i].category}</td>
                <th><button onclick = "upduteElement(${i})" >update</button></th>
                <th><button onclick = "deleteElement(${i})">delete</button></th>
            </tr>
        `
    }
    tBody.innerHTML = temp

    // to display btn delete all and count num element
    if(prodectList.length > 0){
        deleteAll.style.display = "block"
        deleteAll.innerHTML = `delete all (${prodectList.length})`
    }else {
        deleteAll.style.display = "none"
    }

}
display()


// delete row

function deleteElement(i){
    prodectList.splice(i,1);
    localStorage.setItem("dataList", JSON.stringify(prodectList))
    display()
}
deleteAll.addEventListener("click", deleteAllElement)
function deleteAllElement(){
    prodectList.splice(0);
    localStorage.setItem("dataList", JSON.stringify(prodectList))
    display()
} 


// Updute Func 

function upduteElement(i){
    title.value = prodectList[i].title;
    price.value = prodectList[i].price;
    taxes.value = prodectList[i].taxes;
    ads.value = prodectList[i].ads;
    discound.value = prodectList[i].discound;
    getTotal();
    category.value = prodectList[i].category;
    count.style.display = "none";
    create.innerHTML = "Updute";
    mood = "updute";
    temp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}