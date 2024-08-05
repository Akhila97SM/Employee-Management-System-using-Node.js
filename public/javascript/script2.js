// Receive ID from Another Page

// Get the search parameters from the URL
const searchParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const id = searchParams.get('id');

// Store the ID in a variable
const storedId = id;

// Display the stored ID (for demonstration purposes)
function editformClose() {
  const editDataform = document.getElementById("viewEditData");
  editDataform.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";
}

console.log('Stored ID:', storedId); 
fetchData();

async function fetchData() {
  await fetch(`http://localhost:3001/employees/${storedId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json,"
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((employeObject) => {

      const avatar = document.getElementById("viewDetailsAvatar");
      avatar.src = `http://localhost:3001/uploads/${storedId}.jpg`;
      avatar.style.width = "120px";

      document.getElementById("fullname").innerHTML = `${employeObject.salutation}.${employeObject.firstName} ${employeObject.lastName}  `;
      document.getElementById("email").innerHTML = `${employeObject.email}`
      document.getElementById("gender").innerHTML = `${employeObject.gender}`
      document.getElementById("dob").innerHTML = ` ${employeObject.dob}`
      document.getElementById("mobilenum").innerHTML = ` ${employeObject.phone}`
      document.getElementById("qualification").innerHTML = `${employeObject.qualifications}`
      document.getElementById("address").innerHTML = ` ${employeObject.address}`
      document.getElementById("username").innerHTML = `${employeObject.username}`

      const birthdate = ` ${employeObject.dob}`
      console.log(birthdate);
      const [day, month, year] = birthdate.split("-");
      const newDob = `${year}-${month}-${day}`;
      console.log(newDob);

      const AGE = calculateAge(newDob);

      document.getElementById("age").innerHTML = `${AGE}`


    })
}

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - dobDate.getFullYear();
  const monthDiff = currentDate.getMonth() - dobDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
    age--;
  }

  console.log(age);
  return age;
}


//  Edit view detail 

function viewEditformOpen() {
  const editDataform = document.getElementById("viewEditData");
  editDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";




  fetch(`http://localhost:3000/employees/${storedId}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json,"
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((editdetails) => {

      document.getElementById("editSalutation").value = editdetails.salutation;
      document.getElementById("editFirstName").value = editdetails.firstName;
      document.getElementById("editLastName").value = editdetails.lastName;
      document.getElementById("editEmailaddress").value = editdetails.email;
      document.getElementById("editMobileNumber").value = editdetails.phone;
      document.getElementById("editQualification").value = editdetails.qualifications;
      document.getElementById("editAddress").value = editdetails.address;
      document.getElementById("editCountry").value = editdetails.country;
      document.getElementById("editState").value = editdetails.state;
      document.getElementById("editCity").value = editdetails.city;
      document.getElementById("editPin").value = editdetails.pin;
      document.getElementById("editUsername").value = editdetails.username;
      document.getElementById("editPassword").value = editdetails.password;

      // Dob

      const [day, month, year] = editdetails.dob.split("-");
      const newDob = `${year}-${month}-${day}`;
      document.getElementById("editdob").value = newDob;
      console.log(newDob);

      // Gender

      document.querySelector(`input[name="editgenders"][value='${editdetails.gender}']`).checked = true;


    })

  // edit page image preview

  const editpreview = document.getElementById("editPreview");
  editpreview.src = `http://localhost:3000/employees/${storedId}/avatar`;
  editpreview.style.height = "150px";



  const savedata = document.getElementById("savedata");
  savedata.addEventListener("click", () => {
        const editvalid = editvalidation();
    console.log(editvalid);

    if (!editvalid) {
      return;
    }
    else {
      editupload(storedId);
    }



  });

}


function editAvatarPreview() {

  const preview = document.getElementById("editPreview");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.height = "150px";

}

function viewEditformClose() {
  const editDataform = document.getElementById("viewEditData");
  editDataform.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";
}

//  Delete view detail 

function viewDeleteFormopen() {
  const deleteForm = document.getElementById("viewDelData");
  deleteForm.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";
}

function viewDeleteFormclose() {
  const deleteForm = document.getElementById("viewDelData");
  deleteForm.style.display = "none";
  const overlay = document.getElementById("overlayPopUP")
  overlay.style.display = "none";
}




function editupload(storedId) {

  const salutation = document.getElementById("editSalutation").value;
  const firstName = document.getElementById("editFirstName").value;
  const lastName = document.getElementById("editLastName").value;
  const emailAddress = document.getElementById("editEmailaddress").value;
  const mobileNumber = document.getElementById("editMobileNumber").value;
  const dob = document.getElementById("editdob").value;
  const qualification = document.getElementById("editQualification").value;
  const address = document.getElementById("editAddress").value;
  const country = document.getElementById("editCountry").value;
  const state = document.getElementById("editState").value;
  const city = document.getElementById("editCity").value;
  const pinzip = document.getElementById("editPin").value;
  const username = String(firstName) + String(lastName);
  const password = String(firstName) + String(dob);

  //gender
  const gender = document.querySelector('input[name = "editgenders"]:checked').value;


  //DOB
  const [year, month, day] = dob.split("-");
  const newDob = `${day}-${month}-${year}`;


  // creating an object

  var editedData = {
    salutation: salutation,
    firstName: firstName,
    lastName: lastName,
    email: emailAddress,
    phone: mobileNumber,
    dob: newDob,
    gender: gender,
    qualifications: qualification,
    address: address,
    city: city,
    state: state,
    pin: pinzip,
    country: country,
    username: username,
    password: password,
  }
  console.log("edited data", editedData);


  fetch(`http://localhost:3000/employees/${storedId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("edited successdully", data);
      
    // -----------------------------------Img Upload-------------------------------//

    const profileimg = document.getElementById("editupload");
    var imgObject = new FormData();
    imgObject.append("avatar", profileimg.files[0]);
    console.log("img added successfully");


    fetch(`http://localhost:3000/employees/${storedId}/avatar`, {
      method: "POST",
      body: imgObject,
    })
    })
  editformClose();
  fetchData();

}

function editvalidation() {

  let isvalid = true;

  const error = document.getElementsByClassName("error");


  const salutation = document.getElementById("editSalutation");
  const firstName = document.getElementById("editFirstName");
  const lastName = document.getElementById("editLastName");
  const emailAddress = document.getElementById("editEmailaddress");
  const mobileNumber = document.getElementById("editMobileNumber");
  const dob = document.getElementById("editdob");
  const qualification = document.getElementById("editQualification");
  const address = document.getElementById("editAddress");
  const country = document.getElementById("editCountry");
  const state = document.getElementById("editState");
  const city = document.getElementById("editCity");
  const pinzip = document.getElementById("editPin");
  const male = document.getElementById("editgendermale");
  const female = document.getElementById("editgenderfemale");
  const upload = document.getElementById("editupload");
  const username = document.getElementById("editUsername");
  const password = document.getElementById("editPassword");





  const input = function (inputdata, num, msg) {
    if (inputdata.value === "") {
      inputdata.focus();
      error[num].innerHTML = msg;
      isvalid = false;
    }
    else {
      error[num].innerHTML = "";
    }
  }
  // input(upload, 0, "upload photo");
  input(salutation, 1, "enter Salutation");
  input(firstName, 2, "enter your first name");
  input(lastName, 3, "enter your last name");

  //  input(mobileNumber,4,"enter your mobile number");

  input(username, 6, "enter your username");
  input(password, 7, "enter your password");
  input(dob, 8, "enter your dob");
  input(qualification, 10, "enter your qualification");
  input(address, 11, "enter your address");
  input(country, 12, "enter your country");
  input(state, 13, "enter your state");
  input(city, 14, "enter your city");
  input(pinzip, 15, "enter your pinzip");

  const genderinput = function () {
    if (male.checked === false && female.checked === false) {
      error[9].innerHTML = "select your gender";
      isvalid = false;
    }
    else {
      error[9].innerHTML = "";
    }

  }

  genderinput();

  const mobileinput = function (inputdata, num, msg) {
    let maxnum = inputdata.value.trim();

    if (inputdata.value === "") {
      inputdata.focus();
      error[num].innerHTML = msg;
      isvalid = false;
    }

    else if ((maxnum.length) != 10) {
      error[num].innerHTML = "enter valid number";
      isvalid = false;
    }
    else {
      error[num].innerHTML = "";
    }


  }

  mobileinput(mobileNumber, 5, "enter mobile number");

  const disablemsg = function (num) {
    error[num].innerHTML = "";
  }

  const diablegenderinput = function () {
    if (male.checked === true || female.checked === true) {
      error[9].innerHTML = "";

    }

  }
  male.addEventListener("input", () => { diablegenderinput() });
  female.addEventListener("input", () => { diablegenderinput() });

  diablegenderinput();

  const emailinput = function (inputdata, num, msg) {
    let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mailvalid = inputdata.value.trim();
    if (inputdata.value === "") {
      error[num].innerHTML = msg;
      isvalid = false;
    }
    else if (!(mailvalid.match(emailregex))) {
      error[num].innerHTML = "enter a valid email";
      isvalid = false;
    }
    else {
      error[num].innerHTML = "";
    }
  }
  emailinput(emailAddress, 4, "enter your email address");

  upload.addEventListener("input", () => { disablemsg(0) })
  salutation.addEventListener("input", () => { disablemsg(1) });
  firstName.addEventListener("input", () => { disablemsg(2) });
  lastName.addEventListener("input", () => { disablemsg(3) });
  emailAddress.addEventListener("input", () => { disablemsg(4) });
  mobileNumber.addEventListener("input", () => { disablemsg(5) });
  username.addEventListener("input", () => { disablemsg(6) });
  password.addEventListener("input", () => { disablemsg(7) });
  dob.addEventListener("input", () => { disablemsg(8) });
  qualification.addEventListener("input", () => { disablemsg(10) });
  address.addEventListener("input", () => { disablemsg(11) });
  country.addEventListener("input", () => { disablemsg(12) });
  state.addEventListener("input", () => { disablemsg(13) });
  city.addEventListener("input", () => { disablemsg(14) });
  pinzip.addEventListener("input", () => { disablemsg(15) });
  // disablemsg();
  return isvalid
}

//-----------------  delete data ------------------//

function passid(id) {
  console.log("id passed", id);
  document.getElementById("delBtn").addEventListener("click", () => {
    deleteid(id);
  })
}

function deleteid() {
  fetch(`http://localhost:3000/employees/${storedId}`, {
    method: "DELETE",

  })
    .then((response) => response.json())
    .then((data) => {
      console.log("DELETE COMPLETED");
    })
    .catch((error) => {
      console.log("error in deletion");
    });

  viewDeleteFormclose();
  window.location.href = "index.html";
}











