let loginUser = document.querySelector('#loginUser');

loginUser.addEventListener("submit", (e) => {
	e.preventDefault();

	let email = document.querySelector('#email').value
	let password = document.querySelector('#password').value

	if(email === "" || password === ""){
		alert('Oops! Your email or password is missing.')
	} else {
		fetch("http://localhost:3000/api/users/login", 
			{
				method: "POST",
				headers: {
					"Content-Type" : "application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			}
		)
		.then(result => result.json())
		.then(result => {
			localStorage.setItem("token", result.access);
			let token = result.access
			if(token){
				fetch("http://localhost:3000/api/users/details", 
					{
						method: "GET",
						headers: {
							"Authorization" : `Bearer ${token}`
						}
					}
				)
				.then(result => result.json())
				.then(result => {
					localStorage.setItem("id", result._id);
					localStorage.setItem("isAdmin", result.isAdmin);

					window.location.replace('./products.html')
				})
			}
		})
	}
})