let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');
let token = localStorage.getItem('token')

fetch(`https://young-peak-11745.herokuapp.com/api/products/archiveProduct/${productId}`, 
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
		alert(`축하해! Product archived successfully!`)
		window.location.replace("./products.html");
	} else {
		alert("죄송합니다! Something went wrong.")
	}
})