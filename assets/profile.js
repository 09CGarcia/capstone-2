
let token = localStorage.getItem('token')

let username = document.querySelector('#username');
let email = document.querySelector('#email');
let productContainer = document.querySelector('#productContainer')
let totalDueHTML = document.querySelector('#totalDue')
let totalDue = 0
fetch('https://young-peak-11745.herokuapp.com/api/users/details',
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

		if (result.isAdmin != true) {
			result.order.forEach((order) => {
				
				let totalAmount = order.totalAmount
				let productId = order.products[0].productId
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

					totalDue += totalAmount
					productContainer.innerHTML +=
						`
							<div class="card my-5">
								<h4 class="card-title">${result.name}</h4>
								<p class="card-title">${result.description}</p>
								<p class="card-title">Price: ${result.price}</p>
								<p class="card-title">QTY: ${order.products[0].quantity}</p>
								<p class="card-title">Total: ${order.totalAmount}</p>
								<p class="card-title">Order ID: ${order._id}</p>
								<h5 class="card-title">Ordered on: ${result.productOrdered[0].purchasedOn}</h5>
								
							</div>
				
						`
				totalDueHTML.innerHTML = `<div class="card my-5"><b>Total Due: </b>${totalDue}</div>`
					})

			})

			} else {
				productContainer.innerHTML += `
				<h5> All Orders </h5>
				`
				fetch(`https://young-peak-11745.herokuapp.com/api/users/allOrders`,
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
						let order = result[i][j]
						if (order._id != undefined) {
						let orderID = order._id
						let quantity = order.products[0].quantity
						let purchaseDate = order.purchasedOn

						fetch(`https://young-peak-11745.herokuapp.com/api/products/getProduct/${order.products[0].productId}`,
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
								<h4 class="card-title">Order ID: ${orderID}</h4>
								<p class="card-title">Product: ${result.name} </p>
								<p class="card-title">Total: ${order.totalAmount}</p>
								<p class="card-title">QTY: ${quantity}</p>
								<p class="card-title">Purchased on: ${purchaseDate}</p>
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
