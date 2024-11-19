var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discound = document.getElementById("discound");
var total = document.getElementById("total");
var category = document.getElementById("category");
var create = document.getElementById("create");



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
        category :category.value,
    } ;
    prodectList.push(prodect);
    localStorage.setItem("dataList", JSON.stringify(prodectList))
    console.log(prodectList);
    
}
