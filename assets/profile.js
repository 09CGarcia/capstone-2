
let token = localStorage.getItem('token')

let username = document.querySelector('#username');
let email = document.querySelector('#email');
let productContainer = document.querySelector('#productContainer')

fetch('http://localhost:3000/api/users/details',
	{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then(result => {
		username.innerHTML = `${result.userName}`
		email.innerHTML = result.email
		console.log(result.isAdmin)
		if (result.isAdmin != true) {
			result.order.forEach((order) => {
				
				let productId = order.products[0].productId
				fetch(`http://localhost:3000/api/products/getProduct/${productId}`,
					{
						method: "GET",
						headers: {
							"Authorization" : `Bearer ${token}`
						}
					}
				)
				.then(result => result.json())
				.then(result => {
					productContainer.innerHTML +=
						`
							<div class="card my-5">
								<h4 class="card-title">${result.name}</h4>
								<p class="card-title">${result.description}</p>
								<h5 class="card-title">${result.productOrdered[0].purchasedOn}</h5>
								
							</div>
				
						`
					})
			})
			} else {
				productContainer.innerHTML += `
				<h5> All Orders </h5>
				`
				fetch(`http://localhost:3000/api/users/allOrders`,
					{
						method: "GET",
						headers: {
							"Authorization" : `Bearer ${token}`
						}
					}
				)
				.then(result => result.json())
				.then(result => {
					for (let i = 0; i < result.length; i++) {
						for (let j = 0; j < result[i].length; j++) {
						if (result[i][j]._id != undefined) {
						let orderID = result[i][j]._id
						let quantity = result[i][j].products[0].quantity
						let purchaseDate = result[i][j].purchasedOn
						fetch(`http://localhost:3000/api/products/getProduct/${result[i][j].products[0].productId}`,
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
						productContainer.innerHTML +=
						`
							<div class="card my-5">
								<h4 class="card-title">Order ID: ${orderID}</h4>
								<h4 class="card-title">Product: ${result.name} </h4>
								<h4 class="card-title">QTY: ${quantity}</h4>
								<h5 class="card-title">Purchased on: ${purchaseDate}</h5>
							</div>
						`
						})
						}
						}

						}
					}
					)

			}
})
