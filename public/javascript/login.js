// Validation

let credentialValid = true;
let signCredentialValid = true;

// Sign in btn click 
let signIn = document.getElementById("signInBtn");
signIn.addEventListener("click",()=>{
    let validCheck = logInValidation();
    if(!validCheck){
        return;
    }
    else{
        logInPost();
    }
})

function logInPost() {
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    let errorMessage = document.getElementById("error-message");


let Credentials = {
    email: email,
    password: password,
};
fetch("http://localhost:3001/users/login",{
    method:"POST",
    headers: {
        "Content-Type":"application/json",
    },
    body:JSON.stringify(Credentials),
})
.then(async (response) =>{
    let data;
    try {
        data = await response.json();
    } catch (e) {
        throw new Error ("Invalid JSON response");
    }
    if (!response.ok) {
        errorMessage.textContent = data.error || "An error occurred.";
      } else {
        window.location.href = "/";
      }
})
.catch((error) =>{
    console.error("Error during login:", error);
    errorMessage.textContent = "An error occurred during login. Please try again later.";
});
}

function logInValidation() {
    let credentialValid = true;
    let email = document.getElementById("Email");
    let password =document.getElementById("Password");
    let errorMessage = document.getElementById("error-message");
    if(email.value ==="" && password.value ===""){
        errorMessage.textContent = "* Please Enter Email and Password"
        credentialValid =false
    }

    else if(email.value ===""){
        errorMessage.textContent = "* please enter an email"
        credentialValid = false
    }
    else if(password.value ===""){
        errorMessage.textContent = "* please enter an Password"
        credentialValid = false
    }
    console.log(credentialValid);

    return credentialValid;
}

