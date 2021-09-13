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
		fetch("https://young-peak-11745.herokuapp.com/api/users/emailExists",
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
				fetch("https://young-peak-11745.herokuapp.com/api/users/register",
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
						alert('Welcome to 2! 3! 가게');
						
						window.location.replace('./login.html');
					} else {
						alert('죄송합니다! Something went wrong.');
					}
				})
			}  else {
				alert(`죄송합니다! The email you're trying to register already exists.`)
			}
		})
	}
})