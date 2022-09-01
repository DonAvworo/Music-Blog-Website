//Signup Modal Logic

// Get the signup modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function onCloseModal() {
  modal.style.display = "none";
}

function myFunction(x) {
  x.classList.toggle("fa-thumbs-down");
};

const onSignUp = async (event) => {

  console.log('Loading the Sign Up page...');
  event.preventDefault();

  // Close the Modal
  onCloseModal();

  // Get the form data
  var formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("psw").value,
    name: document.getElementById("username").value
  }

  // validate the form data
  if (formData.email == "" || formData.password == "" || formData.username == "") {
    alert("Please fill in all fields");
    return;
  }

  console.log('Sign Up form data: ', formData);
  if (formData.password != document.getElementById("pswrepeat").value) {
    alert("Passwords do not match");
    return;
  }

  // Send the form data to the server
  console.log(formData)
  const response = await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  // Get the response from the server
  console.log('Geting Response')
  //const response = await newUser.json();
  if (response.ok) {
    console.log('User created');
    alert("User created");
    //window.location.href = '/';
  }
  else {
    response.json().then(data => {
      console.log('Error creating user: ', data);
      alert(data.message);
      if (data.errors.length) {
        alert(data.errors[0].message);
      }
    })
    // Redirect to whereever you want them to go once they've signed up
  }
}

const signupButton = document.getElementById('signupButton');
signupButton.addEventListener('click', onSignUp);




//Login Modal Logic

var logInModal = document.getElementById('id02');



// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == logInModal) {
    logInModal.style.display = "none";
  }
}

function onCloselogInModal() {
  logInModal.style.display = "none";
}

function myFunction(x) {
  x.classList.toggle("fa-thumbs-down");
};

const onSignIn = async (event) => {

  console.log('Loading the Sign In page...');
  event.preventDefault();

  // Close the Modal
  onCloselogInModal();

  // Get the form data
  var logInData = {
    email: document.getElementById("emailB").value,
    password: document.getElementById("pswB").value,
    name: document.getElementById("usernameB").value
  }


  // validate the ;ogIn data
  if (logInData.email == "" || logInData.password == "" || logInData.username == "") {
    alert("Please fill in all fields");
    return;
  }

  // Send the form data to the server
  console.log(logInData)
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logInData)
  })

  // Get the response from the server
  console.log('Geting Response')
  //const response = await newUser.json();
  if (response.ok) {
    console.log('User sucessfully logged in');
    alert("User logged in");
    //window.location.href = '/';
  }
  else {
    response.json().then(data => {
      console.log('Error creating user: ', data);
      alert(data.message);
      if (data.errors.length) {
        alert(data.errors[0].message);
      }
    })
    // Redirect to whereever you want them to go once they've signed up
  }
}

const logInButton = document.getElementById('logInButton');
logInButton.addEventListener('click', onLogIn);

