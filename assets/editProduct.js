let editProduct = document.querySelector('#editProduct');
let params = new URLSearchParams(window.location.search)
let productId = params.get('productId')

let token = localStorage.getItem('token')

let productName = document.querySelector('#productName');
let productPrice = document.querySelector('#productPrice');
let productDesc = document.querySelector('#productDesc');

fetch(`https://young-peak-11745.herokuapp.com/api/products/getProduct/${productId}`,
	{
		method: "GET",
		headers: {
			"Authorization" : `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then(result => {
	console.log(result)

	productName.value = result.name
	productPrice.value = result.price
	productDesc.value = result.description
})

editProduct.addEventListener("submit", (e) => {
	e.preventDefault(e)

	productName = productName.value
	productDesc = productDesc.value
	productPrice = productPrice.value

	fetch(`https://young-peak-11745.herokuapp.com/api/products/edit/${productId}`, 
		{
			method: "PUT",
			headers: {
				"Content-Type" : "application/json",
				"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			name: productName,
			description: productDesc,
			price: productPrice
		})
	}
	)
	.then(result => result.json())
	.then(result => {
		if(result !== "undefined"){
			alert('축하해! Product successfully updated!')
			window.location.replace('./products.html')
		} else {
			alert('죄송합니다! Something went wrong')
		}
	})
})