let token = localStorage.getItem("token");
let admin = localStorage.getItem("isAdmin") === "true";
let adminButton = document.querySelector('#adminButton')
let cardFooter;
if(!admin){
	adminButton.innerHTML = null
} else {
	adminButton.innerHTML =
	`
		<div class="col-md-2" id="cpButton">
			<a href="./createProduct.html" class="btn">Create Product
			</a>
		</div>
	`
}
fetch("https://young-peak-11745.herokuapp.com/api/products/allProducts", 
	{
		method: "GET",
		headers: {
			"Authorization" : `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then(result => {
	if(result.length < 1){
		productData = `No Products Available`
	} else {
		productData = result.map((product) => {
			

			if(admin === false || !admin){
				cardFooter = 
			`
				<a href="./viewProduct.html?productId=${product._id}" class="btn btn-block selectButton" >View Product</a>
			`
			} else {

				if(product.isActive === true){
					cardFooter =
					`
						<a href="./editProduct.html?productId=${product._id}" class="btnEdit btn-block text-center editButton">Edit Product</a>
						
						<a href="./archiveProduct.html?productId=${product._id}" class="btnArchive btn-block text-center archiveButton">Archive Product</a>
						
						<a href="./deleteProduct.html?productId=${product._id}" class="btnDelete btn-block text-center deleteButton">Delete Product</a>
					`

				} else {
					cardFooter =
					`
						<a href="./editProduct.html?productId=${product._id}" class="btnEdit btn-block text-center editButton">Edit Product</a>

						<a href="./unarchiveProduct.html?productId=${product._id}" class="btnUnarchive btn-block text-center unarchiveButton">
							Unarchive Product </a>
						
						<a href="./deleteProduct.html?productId=${product._id}" class="btnDelete btn-block text-center deleteButton">
							Delete Product </a>
					`

				}
			}

			// map images
			return(
				`
				<div class="col-md-6 my-5">
					<div class="card">
						<div class="card-body">
							<center>
							<img src="../albumcover/${product.image}" width="250" class="img-fluid" ></center>
							<h5 class="card-title">
								${product.name}
							</h5>
							<p class="card-text text-left"> 
								${product.description}
							</p>
							<p class="card-text text-right">
								₱ ${product.price}
							</p>
						</div>
						<div class="card-footer">
								${cardFooter}

						</div>
					</div>
				</div>

				`

				)
			
		}).join('')
	}

	let container = document.querySelector('#productContainer')
	container.innerHTML = productData
})