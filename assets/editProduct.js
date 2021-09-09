let createProduct = document.querySelector('#editProduct')

createProduct.addEventListener("submit", (e) => {
	e.preventDefault()

	let productName = document.querySelector('#productName').value
	let productPrice = document.querySelector('#productPrice').value
	let productDesc = document.querySelector('#productDesc').value

	if(productName !== "" && productPrice !== "" && productDesc !== ""){
		
		let token = localStorage.getItem("token"); 

		fetch("http://localhost:3000/api/products/editProduct", 
			{
				method: "POST",
				headers: {
					"Content-Type" : "application/json",
					"Authorization" : `Bearer ${token}` 
				},
				body: JSON.stringify({
					name: productName,
					price: productPrice,
					description: productDesc
				})

			}
		)
		.then(result => result.json())
		.then(result => {
			if(result){
				alert(`Product successfully edited!`)

				window.location.replace("./products.html")
			} else {
				alert(`Product creation failed, something went wrong!`)
			}
		})
	}
})