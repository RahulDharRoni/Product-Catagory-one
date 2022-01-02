//selector
const filterForm = document.querySelector('#filter');
const productNameInpute = document.querySelector('.product-name');
const productPriceInpute = document.querySelector('.product-price');
const submitBtn = document.querySelector('.add-product');
const msg = document.querySelector('.message');

const deleteBtn =document.querySelector('.delete-btn');

const ulItems = document.querySelector('.collection');

//data 
let productData = [];

function getData (productlist){
    if(productData.length > 0){
        msg.innerHTML = '';
    productlist.forEach(products => {
        const {id, name, price} = products;
        li = document.createElement('li');
        li.className = "list-group-item collection-item";
        li.id = `product-${id}`;
        li.innerHTML = `<strong>${name}</strong>
        <span class="price">$${price}</span> 
        <i class="fas fa-trash float-right delete-btn"></i> `;
        ulItems.appendChild(li);
   });
    }else{
        showMessage('Please add item to your catalog');
    };
}
getData(productData); 

submitBtn.addEventListener('click', (r)=>{
    r.preventDefault();
    const productName1 = productNameInpute.value;
    const productPrice1 = productPriceInpute.value;
    let id;
    if (productData.length === 0){
        id = 0;
    }else{
        id = productData[productData.length-1].id + 1;
    };
    if(productName1 == '' || productPrice1 == '' ){
        alert("Please enter the Name and Price")
    }else{
        productData.push({
            id,
            name: productName1,
            price:productPrice1
        });
        ulItems.innerHTML= '';
        getData(productData);
        productNameInpute.value = ''; 
        productPriceInpute.value = '';
    }
    console.log(productName1, productPrice1);
});
ulItems.addEventListener('click', (r)=>{
    if(r.target.classList.contains('delete-btn')){
        const target = r.target.parentElement;
        r.target.parentElement.parentElement.removeChild(target);
        const id = parseInt(target.id.split('-')[1]);
        console.log(typeof id);
        const ans = productData.filter((dProduct) =>{
            return dProduct.id !== id;
        });
        productData = ans;
    }
    
})
filterForm.addEventListener('keyup', (r)=>{
    const text = r.target.value.toLowerCase();
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productNameSearch = item.firstElementChild.textContent.toLowerCase();
        if(productNameSearch.indexOf(text) === -1){
            showMessage("No Item Meet Your Criteria");
            item.style.display= 'none';
        }else{
            showMessage("Please add item to your catalog");
            msg.innerHTML = '';
            item.style.display= 'block';
        };
    });
});
function showMessage(twoMessages){
    msg.innerHTML = twoMessages;
    // if(fatchMessage){
    //     msg.innerHTML = 'Please add item to your catalog';
    // }else if(searchMessage){
    //     msg.innerHTML = 'No Item Meet Your Criteria';
    // }
}
