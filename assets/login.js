let loginUser = document.querySelector('#loginUser');

loginUser.addEventListener("submit", (e) => {
	e.preventDefault();

	let email = document.querySelector('#email').value
	let password = document.querySelector('#password').value

	if(email === "" || password === ""){
		alert('죄송합니다! Your email or password is missing.')
	} else {
		fetch("https://young-peak-11745.herokuapp.com/api/users/login", 
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
				fetch("https://young-peak-11745.herokuapp.com/api/users/details", 
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
			} else {
				alert(`죄송합니다! Your email and password does not match`)
			}
		})
	}
})