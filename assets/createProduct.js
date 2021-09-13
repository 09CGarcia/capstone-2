let createProduct = document.querySelector('#createProduct')

createProduct.addEventListener("submit", (e) => {
	e.preventDefault()

						// <div class="form-group col-md-12">
						// 	<input type="text" id="imageName" placeholder="Add Image Name" class="form-control" required="">
						// </div>
	let productImage = document.querySelector('#imageName').value
	let productName = document.querySelector('#productName').value
	let productPrice = document.querySelector('#productPrice').value
	let productDesc = document.querySelector('#productDesc').value

	if(productName !== "" && productPrice !== "" && productDesc !== ""){
		
		let token = localStorage.getItem("token"); 

		fetch("https://young-peak-11745.herokuapp.com/api/products/createProduct", 
			{
				method: "POST",
				headers: {
					"Content-Type" : "application/json",
					"Authorization" : `Bearer ${token}` 
				},
				body: JSON.stringify({
					image: productImage,
					name: productName,
					price: productPrice,
					description: productDesc
				})

			}
		)
		.then(result => result.json())
		.then(result => {
			if(result){
				alert(`축하해! Product successfully created!`)

				window.location.replace("./products.html")
			} else {
				alert(`죄송합니다! Product creation failed, something went wrong!`)
			}
		})
	}
})