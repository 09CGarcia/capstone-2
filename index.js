let navSession = document.querySelector('.navbar-nav');
let registerLink = document.querySelector('#register');
let userToken = localStorage.getItem('token');

if(userToken == ""){
	// console.log("empty");
	navSession.innerHTML = 
	`
		<li class="nav-item">
			<a href="./pages/login.html" class="nav-link">Sign In</a>
		</li>
	`

	registerLink.innerHTML =
	`
		<li class="nav-item">
			<a href="./pages/register.html" class="nav-link">Register</a>
		</li>
	`
} else {
	// console.log("not empty");
	navSession.innerHTML =
	`
		<li class="nav-item">
			<a href="./logout.html" class="nav-link">Sign Out</a>
		</li>

		<li class="nav-item">
			<a href="./profile.html" class="nav-link">Profile</a>
		</li>
	`
}