let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');
let token = localStorage.getItem('token')

fetch(`http://localhost:3000/api/products/deleteProduct/${productId}`, 
	{
		method: "DELETE",
		headers: {
			"Authorization" : `Bearer ${token}`
		}
	}
)
.then(result => result)
.then(result => {
	if(result){
		window.location.replace("./products.html");
	} else {
		alert("Something went wrong.")
	}
})