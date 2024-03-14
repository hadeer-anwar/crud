let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let create=document.getElementById("crt-btn");
let count=document.getElementById("count");
let name=document.getElementById("name");
let cat=document.getElementById("category");
let delAll=document.getElementById("del-all");
let tbody=document.getElementById("table");
let arr,idx;
if(localStorage.products!=null)
{
    arr=JSON.parse(localStorage.getItem("products")); 
}
else {
    arr=[];
}
function getTotal()
{
    if(price.value!='')
    {
        let res=(Number (price.value)+ Number (taxes.value)+ Number (ads.value))-Number (discount.value);
        total.innerHTML=res;
        total.style.backgroundColor="green";
    }
    else 
    {
        total.innerHTML="";
        total.style.backgroundColor="rgb(253, 49, 13)"
    }
}
function deleteAll()
{
  arr=[];
  localStorage.products=JSON.stringify(arr);
  show();
}
function update(i)
{
title.value=arr[i].title;
price.value=arr[i].price;
taxes.value=arr[i].taxes;
ads.value=arr[i].ads;
discount.value=arr[i].discount;
total.textContent=arr[i].total;
cat.value=arr[i].category;
count.value=1;
count.style.display="none";
arr.splice(i,1);
total.style.backgroundColor="green";
create.textContent="Update";
idx=i;
scroll({
    top:0,
    behavior:"smooth"
})
}
let searchMood="title";
function getSearchMood(mood)
{
    searchMood=mood;
    let srch=document.getElementById("srch");
    srch.focus();
    srch.placeholder=`Search By ${mood}`;
    
}

function searchItem(val)
{
    let statement='';
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].title.includes(val))
        {
            statement+=`
            <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].total}</td>
            <td><button id='update' onclick='update(${i})'>update</button></td>
            <td><button id='delete'onclick='delet(${i})'>delete</button></td>
            </tr>
            `;
        }
        else if(arr[i].category.includes(val)){
            statement+=`
            <tr>
            <td>${i+1}</td>
            <td>${arr[i].title}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].taxes}</td>
            <td>${arr[i].ads}</td>
            <td>${arr[i].discount}</td>
            <td>${arr[i].category}</td>
            <td>${arr[i].total}</td>
            <td><button id='update' onclick='update(${i})'>update</button></td>
            <td><button id='delete'onclick='delet(${i})'>delete</button></td>
            </tr>
            `; 
        }
    }
    tbody.innerHTML=statement;

  }


function show()
{
    if(arr.length!=0)
    {
        delAll.style.display="block";
    }
    else 
    {
        delAll.style.display="none";
    }
    arr=JSON.parse(localStorage.getItem("products")); 
   let statement=``;
   for( let i = 0; i<arr.length ; i++)
   {
   
     statement+=`
    <tr>
    <td>${i+1}</td>
    <td>${arr[i].title}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].taxes}</td>
    <td>${arr[i].ads}</td>
    <td>${arr[i].discount}</td>
    <td>${arr[i].category}</td>
    <td>${arr[i].total}</td>
    <td><button id='update' onclick='update(${i})'>update</button></td>
    <td><button id='delete'onclick='delet(${i})'>delete</button></td>
    </tr>
    `;
   }
   tbody.innerHTML=statement;
}
document.onload=show();
function delet(i)
{
  arr.splice(i,1);
  localStorage.products=JSON.stringify(arr);
  show();
}
function clear()
{
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    cat.value="";
    total.style.backgroundColor="rgb(253, 49, 13)";
}
function createProduct()
{
    let obj={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:cat.value
    };
    if(create.textContent==="Create")
    {
        for(let i=0;i< Number (count.value);i++)arr.push(obj);
    }
    else 
    {
        arr[idx]=obj;
        create.textContent="Create";
        count.style.display="block";
    }
   
    localStorage.setItem("products",JSON.stringify(arr));
    clear();
    show();
   

}
