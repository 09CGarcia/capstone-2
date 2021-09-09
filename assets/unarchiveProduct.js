let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');
let token = localStorage.getItem('token')

fetch(`http://localhost:3000/api/products/unarchiveProduct/${productId}`, 
	{
		method: "PUT",
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