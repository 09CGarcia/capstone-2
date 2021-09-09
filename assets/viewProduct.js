let params = new URLSearchParams(window.location.search);


let productId = params.get('productId');


let productName = document.querySelector('#productName');
let productDesc = document.querySelector('#productDesc');
let productPrice = document.querySelector('#productPrice');
let productContainer = document.querySelector('#productContainer')
let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/products/getProduct/${productId}`, 
		{
			method: "GET",
			headers: {
				"Authorization":`Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then(result => {

	productName.innerHTML = result.name
	productDesc.innerHTML = result.description
	productPrice.innerHTML = result.price
	// orderQuantity.innerHTML = result.quantity

	productContainer.innerHTML = `
		<button class="btn btn-block" id="orderButton">Order Now!</button>
	`
	let orderButton = document.querySelector('#orderButton');
	orderButton.addEventListener("click", () => {
	let orderQuantity = parseInt(document.getElementById("quantity").value)
		console.log(orderQuantity)
		fetch(`http://localhost:3000/api/users/newOrder`,
			{
				method: "POST",
				headers: {
					"Content-Type" : "application/json",
					"Authorization" : `Bearer ${token}`
				},
				body: JSON.stringify({
					productId: productId,
					quantity: orderQuantity,
					productPrice: result.price
				}
				)
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			if(result){
				alert(`Order Placed!`)
				window.location.replace('./products.html')
			} else {
				alert(`Something went wrong.`)
			}
		})
	})



});