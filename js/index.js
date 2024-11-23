var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discound = document.getElementById("discound");
var total = document.getElementById("total");
var count = document.getElementById("count")
var category = document.getElementById("category");
var create = document.getElementById("create");

var tBody = document.querySelector(".outputs tbody")


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
    prodectList.push(prodect);
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
                <th><button >update</button></th>
                <th><button onclick = "deleteElement(${i})">delete</button></th>
            </tr>
        `
    }

    tBody.innerHTML = temp
}
display()


// delete row

function deleteElement(i){
    prodectList.splice(i,1);
    localStorage.setItem("dataList", JSON.stringify(prodectList))
    display()
}