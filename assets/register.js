let registerForm = document.querySelector('#registerUser')
registerForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let firstName = document.querySelector('#firstName').value;
	let lastName = document.querySelector('#lastName').value;
	let email = document.querySelector('#email').value;
	let userName = document.querySelector('#userName').value;
	let password = document.querySelector('#password').value;
	let confirmPassword = document.querySelector('#confirmPassword').value;

	if(password === confirmPassword && password !== "" && confirmPassword !== ""){
		fetch("http://localhost:3000/api/users/emailExists",
			{
				method: "POST",
				headers: {
					"Content-Type" : "application/json"
				},
				body: JSON.stringify({
					email : email
				})
			}
		)
		.then(result => result.json())
		.then(result => {
			if(result === false){
				fetch("http://localhost:3000/api/users/register",
					{
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							email: email,
							userName: userName,
							password: password
						})
					}
				)
				.then(result => result.json())
				.then(result => {
					if(result === true){
						alert('Welcome to 2! 3! 쇼핑');
						
						window.location.replace('./login.html');
					} else {
						alert('Something went wrong. Please check your details.');
					}
				})
			}  else {
				alert(`The email you're trying to register already exists.`)
			}
		})
	}
})