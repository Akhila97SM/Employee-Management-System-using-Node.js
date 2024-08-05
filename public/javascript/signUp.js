
let signUp = document.getElementById("signUpBtn");
signUp.addEventListener("click",()=>{
    let validCheck = signupvalidation();
    if(!validCheck){
        return;
    }
    else{
        console.log("else");
        signUpPost();
    }
})
function signUpPost() {
    let username =document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    let credentials = {
        username: username,
        email: email,
        password:password,
    };

    fetch("http://localhost:3001/users/register" , {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
    .then(async (response)=>{
        let data;
        try {
            data = await response.json();
            console.log(data);
        }catch (e) {
            throw new Error("Invalid JSON responds");
        }

        if(!response.ok) {
            errorMessage.textContent = data.error || "An error occurred.";
        } else {
            window.location.href = "/otp";
        }
    })
    .catch((error) => {
        console.error("Error during login:", error);
        errorMessage.textContent = "An error occurred during login. Please try again later.";
    });
}

function signupvalidation(){
    let signValid = true;
    let email = document.getElementById("email");
    let password =document.getElementById("password");
    let username =document.getElementById("username");

    let errorMessage = document.getElementById("error-message");
    if(email.value ==="" && password.value ==="" && username.value ===""){
        errorMessage.textContent = "* Please Enter All fields"
        signValid =false
    }

    else if(email.value ===""){
        errorMessage.textContent = "* please enter an email"
        signValid = false
    }
    else if(password.value ===""){
        errorMessage.textContent = "* please enter an Password"
        signValid = false
    }
    else if(username.value ===""){
        errorMessage.textContent = "* please enter an Username"
        signValid = false
    }
    console.log(signValid);

    return signValid;
}

