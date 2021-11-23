console.log("app loaded!");

var	Transformers = [];

var editID = null;

var addButton = document.querySelector("#add-button");
addButton.onclick = function() {
	var newTranformerNameInput = document.querySelector("#new-transformer-name");
	var newTranformerAffiliationInput = document.querySelector("#new-transformer-affiliation");
	var newTranformerAltModeInput = document.querySelector("#new-transformer-altmode");
	var newTranformerRankInput = document.querySelector("#new-transformer-rank");
	var newTranformerSignatureWeaponInput = document.querySelector("#new-transformer-signatureweapon");
	if (newTranformerNameInput.value == ""){
		alert('Enter a Name!');
	}
	else if (newTranformerAffiliationInput.value == ""){
		alert('Enter a Affiliation!');
	}
	else if (newTranformerAltModeInput.value == ""){
		alert('Enter an Alt Mode!');
	}
	else if (newTranformerRankInput.value == ""){
		alert('Enter a Rank!');
	}
	else if (newTranformerSignatureWeaponInput.value == ""){
		alert('Enter a Signature Weapon!');
	}
	else {
		createTransformerOnServer(newTranformerNameInput.value, newTranformerAffiliationInput.value, newTranformerAltModeInput.value, newTranformerRankInput.value, newTranformerSignatureWeaponInput.value);
	}
};

var saveButton = document.querySelector("#save-button");
saveButton.onclick = function() {
	var newTranformerNameInput = document.querySelector("#new-transformer-name");
	var newTranformerAffiliationInput = document.querySelector("#new-transformer-affiliation");
	var newTranformerAltModeInput = document.querySelector("#new-transformer-altmode");
	var newTranformerRankInput = document.querySelector("#new-transformer-rank");
	var newTranformerSignatureWeaponInput = document.querySelector("#new-transformer-signatureweapon");
	if (newTranformerNameInput.value == ""){
		alert('Enter a Name!');
	}
	else if (newTranformerAffiliationInput.value == ""){
		alert('Enter a Affiliation!');
	}
	else if (newTranformerAltModeInput.value == ""){
		alert('Enter an Alt Mode!');
	}
	else if (newTranformerRankInput.value == ""){
		alert('Enter a Rank!');
	}
	else if (newTranformerSignatureWeaponInput.value == ""){
		alert('Enter a Signature Weapon!');
	}
	else {
		updateTransformerOnServer(newTranformerNameInput.value, newTranformerAffiliationInput.value, newTranformerAltModeInput.value, newTranformerRankInput.value, newTranformerSignatureWeaponInput.value, editID);
		document.querySelector("#save-button").style.display="none";
		document.querySelector("#add-button").style.display="inline";
	}
};

var resetButton = document.querySelector("#reset-button");
resetButton.onclick = function() {
	var newTranformerNameInput = document.querySelector("#new-transformer-name");
	var newTranformerAffiliationInput = document.querySelector("#new-transformer-affiliation");
	var newTranformerAltModeInput = document.querySelector("#new-transformer-altmode");
	var newTranformerRankInput = document.querySelector("#new-transformer-rank");
	var newTranformerSignatureWeaponInput = document.querySelector("#new-transformer-signatureweapon");
	newTranformerNameInput.value = "";
	newTranformerAffiliationInput.value = "";
	newTranformerAltModeInput.value = "";
	newTranformerRankInput.value = "";
	newTranformerSignatureWeaponInput.value = "";
};

var registerButton = document.querySelector("#register-button");
registerButton.onclick = function() {
	var userFirstNameInput = document.querySelector("#first-name");
	var userLastNameInput = document.querySelector("#last-name");
	var userEmailInput = document.querySelector("#email");
	var userPasswordInput = document.querySelector("#password");
	if (userFirstNameInput.value == ""){
		alert('Enter a First Name!');
	}
	else if (userLastNameInput.value == ""){
		alert('Enter a Last Name!');
	}
	else if (userEmailInput.value == ""){
		alert('Enter an Email!');
	}
	else if (userPasswordInput.value == ""){
		alert('Enter a Password!');
	}
	else {
		createUserOnServer(userFirstNameInput.value, userLastNameInput.value, userEmailInput.value, userPasswordInput.value);
	}
};

var loginButton = document.querySelector("#login-button");
loginButton.onclick = function() {
	var userEmailInput = document.querySelector("#login_email");
	var userPasswordInput = document.querySelector("#login_password");
	if (userEmailInput.value == ""){
		alert('Enter an Email!');
	}
	else if (userPasswordInput.value == ""){
		alert('Enter a Password!');
	}
	else {
		authenticateUserOnServer(userEmailInput.value, userPasswordInput.value);
	}
};

var switchToRegisterButton = document.querySelector("#switch-to-register-button");
switchToRegisterButton.onclick = function() {
		document.querySelector("#register").style.display="block";
		document.querySelector("#login").style.display="none";
};

var switchToLoginButton = document.querySelector("#switch-to-login-button");
switchToLoginButton.onclick = function() {
		document.querySelector("#register").style.display="none";
		document.querySelector("#login").style.display="block";
};

var logoutButton = document.querySelector("#logout-button");
logoutButton.onclick = function() {
		logOut();
}

function deleteTransformerOnServer(transformerId) {
	fetch("https://teletraan-1.herokuapp.com/transformers/"+ transformerId, {
		// fetch options here
		method: "DELETE", // request method
		credentials: "include"
	}).then(function (response) {
		// the server has responded here.
		loadTransformers();
	});
}

function logOut() {
	fetch("https://teletraan-1.herokuapp.com/sessions", {
		// fetch options here
		method: "DELETE", // request method
		credentials: "include"
	}).then(function (response) {
		// the server has responded here.
		loadTransformers();
	});	
}

function updateTransformerOnServer(transformerName, affiliation, altmode, rank, signatureweapon, transformerId) {
	var transformerName = "name=" + encodeURIComponent(transformerName);
	var affiliation = "&affiliation=" + encodeURIComponent(affiliation);
	var altmode = "&alt_mode=" + encodeURIComponent(altmode);
	var rank = "&rank=" + encodeURIComponent(rank);
	var signatureweapon = "&signature_weapon=" + encodeURIComponent(signatureweapon);

	data = transformerName+affiliation+altmode+rank+signatureweapon

	fetch("https://teletraan-1.herokuapp.com/transformers/" + transformerId, {
		// fetch options here
		method: "PUT", // post method
		credentials: "include",
		body: data,	// request body with data
		headers: {	// header(s) (to describe the body)
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		// the server has responded here.
		loadTransformers();
		// this code.
	});
}

function createTransformerOnServer(transformerName, affiliation, altmode, rank, signatureweapon) {
	var transformerName = "name=" + encodeURIComponent(transformerName);
	var affiliation = "&affiliation=" + encodeURIComponent(affiliation);
	var altmode = "&alt_mode=" + encodeURIComponent(altmode);
	var rank = "&rank=" + encodeURIComponent(rank);
	var signatureweapon = "&signature_weapon=" + encodeURIComponent(signatureweapon);
	
	data = transformerName+affiliation+altmode+rank+signatureweapon

	fetch("https://teletraan-1.herokuapp.com/transformers", {
		// fetch options here
		method: "POST", // post method
		credentials: "include",
		body: data, 	// request body with data
		headers: {	// header(s) (to describe the body)
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		// the server has responded here.
		loadTransformers();
		// this code.
	});
}

function createUserOnServer(first_name, last_name, email, password) {
	var first_name = "first_name=" + encodeURIComponent(first_name);
	var last_name = "&last_name=" + encodeURIComponent(last_name);
	var email = "&email=" + encodeURIComponent(email);
	var password = "&password=" + encodeURIComponent(password);
	
	data = first_name+last_name+email+password
	fetch("https://teletraan-1.herokuapp.com/users", {
		// fetch options here
		method: "POST", // post method
		credentials: "include",
		body: data, 	// request body with data
		headers: {	// header(s) (to describe the body)
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		// the server has responded here.
		if (response.status == 422) {
			alert('User already created!');
		}
		else {
			document.querySelector("#login").style.display="block";
			document.querySelector("#register").style.display="none";
		}
		// this code.
	});
}

function authenticateUserOnServer(email, password) {
	var email = "&email=" + encodeURIComponent(email);
	var password = "&password=" + encodeURIComponent(password);
	
	data = email+password
	fetch("https://teletraan-1.herokuapp.com/sessions", {
		// fetch options here
		method: "POST", // post method
		credentials: "include",
		body: data, 	// request body with data
		headers: {	// header(s) (to describe the body)
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		// the server has responded here.
		if (response.status == 201) {
			loadTransformers();	
		}
		else {
			alert('Incorrect Email or Password!');
		}
		// this code.
	});
}

function loadTransformers() {
	fetch("https://teletraan-1.herokuapp.com/transformers", {
		credentials: "include"
	}).then(function (response) {
		// here, the server has now responded.

		if (response.status == 401) {
			// show login/register, etc.
			document.querySelector("#login").style.display="block";
			document.querySelector("#register").style.display="none";
			// hide transformers, etc.
			document.querySelector("#transformers").style.display="none";
			return;
		} else if (response.status == 200) {
			// show transformers, etc.
			document.querySelector("#transformers").style.display="block";
			// hide login/register, etc.
			document.querySelector("#login").style.display="none";
			document.querySelector("#register").style.display="none";
		} else {
			// unexpected
		}

		response.json().then(function (dataFromServer) {
			// here, the data is now parsed and available for use.
			Transformers = dataFromServer;
				
			var nameLog = document.querySelector("#log");
			nameLog.innerHTML = "";

			// PYTHON: for element in array
			Transformers.forEach(function (transformer) {

				// loop over the data and display on the page
				var newTransformer = document.createElement("li");
				
				var nameDiv = document.createElement("div");
				nameDiv.innerHTML = transformer.name;
				nameDiv.classList.add("transformer-name");
				newTransformer.appendChild(nameDiv);

				var affiliationDiv = document.createElement("div");
				affiliationDiv.innerHTML = transformer.affiliation;
				affiliationDiv.classList.add("transformer-affiliation");
				newTransformer.appendChild(affiliationDiv);

				var altmodeDiv = document.createElement("div");
				altmodeDiv.innerHTML = transformer.alt_mode;
				altmodeDiv.classList.add("transformer-altmode");
				newTransformer.appendChild(altmodeDiv);

				var rankDiv = document.createElement("div");
				rankDiv.innerHTML = transformer.rank;
				rankDiv.classList.add("transformer-rank");
				newTransformer.appendChild(rankDiv);

				var signatureweaponDiv = document.createElement("div");
				signatureweaponDiv.innerHTML = transformer.signature_weapon;
				signatureweaponDiv.classList.add("transformer-signatureweapon");
				newTransformer.appendChild(signatureweaponDiv);

				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "DELETE";
				deleteButton.classList.add("delete-button");
				deleteButton.onclick = function () {
					console.log("delete button clicked", transformer.id);
					if (confirm("Are you sure you want to delete " + transformer.name + "?")) {
						deleteTransformerOnServer(transformer.id);
					}
				};
				newTransformer.appendChild(deleteButton);
				var updateButton = document.createElement("button");
				updateButton.innerHTML = "EDIT"
				updateButton.classList.add("update-button");
				updateButton.onclick = function() {
					var newTranformerNameInput = document.querySelector("#new-transformer-name");
					newTranformerNameInput.value = transformer.name;
					var newTranformerAffiliationInput = document.querySelector("#new-transformer-affiliation");
					newTranformerAffiliationInput.value = transformer.affiliation;
					var newTranformerAltModeInput = document.querySelector("#new-transformer-altmode");
					newTranformerAltModeInput.value = transformer.alt_mode;
					var newTranformerRankInput = document.querySelector("#new-transformer-rank");
					newTranformerRankInput.value = transformer.rank;
					var newTranformerSignatureWeaponInput = document.querySelector("#new-transformer-signatureweapon");
					newTranformerSignatureWeaponInput.value = transformer.signature_weapon;
					editID = transformer.id;
					document.querySelector("#save-button").style.display="inline";
					document.querySelector("#add-button").style.display="none";
				};
				newTransformer.appendChild(updateButton);

				nameLog.appendChild(newTransformer);
			});
		});
	});
}

//when the page loads:
loadTransformers();