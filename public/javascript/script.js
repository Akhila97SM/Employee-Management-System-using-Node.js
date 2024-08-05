
function addformOpen() {
  const addDataform = document.getElementById("addData");
  addDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";

}


function addformClose() {
  const addDataformclose = document.getElementById("addData");
  addDataformclose.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";

}


function editformClose() {
  const editDataform = document.getElementById("editData");
  editDataform.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";
}


function deleteForm() {
  const delDataform = document.getElementById("delData");
  delDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";
}


function deleteFormclose() {
  const delDataform = document.getElementById("delData");
  delDataform.style.display = "none";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "none";
}



//!============ search and geting data ======================//
let pagesize = 5;
// table count
document.getElementById("employeeNumber").addEventListener("change", () => {
  dataCount = document.getElementById("employeeNumber");
  pagesize = parseInt(dataCount.value);
  fetchSearchResults(searchQuery, 1, pagesize);
});
let searchQuery = document.getElementById("searchbar").value;
fetchSearchResults(searchQuery, 1);


function fetchSearchResults(searchQuery, page, pagesize) {
  const url = `http://localhost:3001/employees/searchAndPagination?search=${searchQuery}&page=${page}&pagesize=${pagesize}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let totalPage = data.pagination.totalPage;
      let currentPage = data.pagination.currentPage;
      displayData(data.users, currentPage);
      renderPaginationButtons(totalPage, currentPage);
    });
}
//search
let searchBar = document.getElementById("searchbar");
searchBar.addEventListener("input", async () => {
  console.log("its working");
  let searchQuery = document.getElementById("searchbar").value;
  fetchSearchResults(searchQuery, 1);
  highlight(currentPage);
});
//*pagination buttons
function renderPaginationButtons(totalPage, currentPage) {
  const pageNationUl = document.getElementById("pagenationcCOntainer");
  pageNationUl.innerHTML = "";
  // back skip button  " < "  //
  const backskip = document.createElement("li");
  backskip.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  pageNationUl.appendChild(backskip);
  backskip.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
    } else {
      currentPage = 1;
    }
    fetchSearchResults(searchQuery, currentPage, pagesize);
    highlight(currentPage);
  });
  // page buttons
  for (let i = 1; i <= totalPage; i++) {
    const pageItems = document.createElement("li");
    pageItems.textContent = `${i}`;
    pageNationUl.appendChild(pageItems);
    pageItems.addEventListener("click", () => {
      let searchQuery = document.getElementById("searchbar").value;
      let page = parseInt(i);
      fetchSearchResults(searchQuery, page, pagesize);
      highlight(page);
    });
  }
  // front skip button  " > "  //
  const frontSkip = document.createElement("li");
  frontSkip.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  pageNationUl.appendChild(frontSkip);
  frontSkip.addEventListener("click", () => {
    if (currentPage <= totalPage - 1) {
      currentPage++;
    } else {
      currentPage = totalPage;
    }
    fetchSearchResults(searchQuery, currentPage, pagesize);
    highlight(currentPage);
  });
  function highlight(currentPage) {
    const pageNationUl = document.getElementById("pagenationcCOntainer");
    let buttons = pageNationUl.querySelectorAll("li");
    buttons.forEach((li) => {
      if (li.textContent == currentPage) {
        li.classList.add("pagenation-color");
      } else {
        li.classList.remove("pagenation-color");
      }
    });
  }
}

// Fetching data

function displayData(alldata, currentPage) {


  let tableData = "";
  let items = document.getElementById("employeeNumber").value;
  let count = (currentPage - 1) * items;
  console.log("count",count);

  alldata.map((values) => {
     console.log("count",count);
    count++;
    let slno = count > 9? `#${count}`:`#0${count}`;
    tableData = tableData + ` <tr>
        <th scope="row" class="table-num">${slno}</th>

        <td><img src="http://localhost:3001/uploads/${values._id}.jpg" class="rounded-5 m-2" height="30px"> ${values.salutation}. ${values.firstName} ${values.lastName} </td>
        <td>${values.email} </td>
        <td>${values.phone}</td>
        <td>${values.gender}</td>
        <td>${values.dob}</td>
        <td>${values.country}</td>
        <td>
          <div class="dropdown">
            <a class="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis"></i>
            </a>

            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="viewdetails?id=${values._id}"><span><i class="fa-regular fa-eye "
                      style="color: #b9babb;"></i></span>View Details</a></li>
              <li onclick="editFormOpen('${values._id}')"><a class="dropdown-item" href="#"><span><i class="fa-solid fa-pencil" 
                      style="color: #b9babb;"></i></span>Edit</a></li>
              <li onclick="deleteForm()"><a class="dropdown-item" href="#" onclick="passid('${values._id}')" ><span><i class="fa-solid fa-trash"
                      style="color:  #b9babb;"></i></span>Move to Trash</a></li>
            </ul>
          </div>
        </td>
      </tr>`;
  
  })
  // console.log("data row",tableData);
  document.getElementById("tableBody").innerHTML = tableData;
  console.log("display data successfull");
}



//--------- post data--------- //


function addEmpdata() {
  const salutation = document.getElementById("Salutation").value;
  const firstName = document.getElementById("frst-Name").value;
  const lastName = document.getElementById("last-Name").value;
  const emailAddress = document.getElementById("email-address").value;
  const mobileNumber = document.getElementById("mobile-number").value;
  const dob = document.getElementById("dob").value;
  const qualification = document.getElementById("qualification").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pinzip = document.getElementById("pinzip").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  //gender
  const gender = document.querySelector('input[name = "gender"]:checked').value;


  //DOB
  const dateofBirth = document.getElementById("dob").value;
  const [year, month, day] = dob.split("-");
  const newDob = `${day}-${month}-${year}`;


  // creating an object

  var userData = {
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
    pinzip: pinzip,
    country: country,
    username: username,
    password: password,
  }

  fetch("http://localhost:3001/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),

  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Emp Added succesfully", data);


      console.log("new emp", userData);

      // -----------------------------------Img Upload-------------------------------//

      const profileimg = document.getElementById("upload");
      var imgObject = new FormData();
      imgObject.append("image", profileimg.files[0]);
      console.log("img added successfully");
      userData.avatar = profileimg.files[0];
      console.log("img",data);


      fetch(`http://localhost:3001/employees/${data._id}/image`, {
        method: "POST",
        body: imgObject,
      })
      fetchSearchResults(searchQuery, 1);

      createBtn();
      
    })
    .then(() => {

      Swal.fire({
        icon: "success",
        title: "Employee Added Successfully",
        showConfirmButton: false,
        timer: 1500
      });

    })

}



function avatarPreview() {

  const preview = document.getElementById("imgpreview");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.height = "150px";

}


const addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", () => {
  const valid = validation();
  console.log(valid);

  if (!valid) {
    return;
  }
  else {
    addEmpdata()
  }
  addformClose();
  console.log("EMP ADDED SUCESS");

});

//-----------------  delete data ------------------//

function passid(id) {
  console.log("id passed", id);
  document.getElementById("delBtn").addEventListener("click", () => {
    deleteid(id);
  })
}

function deleteid(id) {
  fetch(`http://localhost:3001/employees/delete/${id}`, {
    method: "PUT",

  })
    .then((response) => response.json())
    .then((data) => {
      console.log("DELETE COMPLETED");
    })
    .catch((error) => {
      console.log("error in deletion");
    });
  deleteFormclose();

}


// -------------------------------Edit data-----------------------------------//


function editFormOpen(editId) {
  const editDataform = document.getElementById("editData");
  editDataform.style.display = "block";
  const overlay = document.getElementById("overlayPopUP");
  overlay.style.display = "block";

  fetch(`http://localhost:3001/employees/${editId}`, {
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
      document.getElementById("editPin").value = editdetails.pinzip;
      document.getElementById("editUsername").value = editdetails.username;
      document.getElementById("editPassword").value = editdetails.password;

      // Dob

      const [day, month, year] = editdetails.dob.split("-");
      const newDob = `${year}-${month}-${day}`;
      document.getElementById("editdob").value = newDob;
      console.log(newDob);

      // Gender

      document.querySelector(`input[name="editgender"][value='${editdetails.gender}']`).checked = true;

    })

  // edit page image preview

  const editpreview = document.getElementById("editPreview");
  editpreview.src = `http://localhost:3001/uploads/${editId}.jpg`;
  editpreview.style.height = "150px";



  const savedata = document.getElementById("savedata");
  savedata.addEventListener("click", () => {

    const editvalid = editvalidation();
    console.log(editvalid);

    if (!editvalid) {
      return;
    }
    else {
      editupload(editId);
    }

  });
}


function editupload(editId){

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
const username = document.getElementById("editUsername").value;
const password = document.getElementById("editPassword").value;

//gender
const gender = document.querySelector('input[name = "editgender"]:checked').value;


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
editedData.id = editId;

fetch(`http://localhost:3001/employees/${editId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(editedData),
})
  .then((res) => res.json())
  .then((data) => {
    console.log("edited successfully", data);

   




    // -----------------------------------Img Upload-------------------------------//

    const profileimg = document.getElementById("editupload");
    var imgObject = new FormData();
    imgObject.append("image", profileimg.files[0]);
    console.log("img added successfully");


    fetch(`http://localhost:3001/employees/${editId}/image`, {
      method: "POST",
      body: imgObject,
    })
  })
  .then(() => {

    Swal.fire({
      icon: "success",
      title: "Employee Edited Successfully",
      showConfirmButton: false,
      timer: 1500
    });
    fetchSearchResults(searchQuery, 1);


  })

editformClose();
}


function editAvatarPreview() {

  const preview = document.getElementById("editPreview");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.height = "150px";

}

// page highlight

function highlight(currentPage) {

  const navButtons = document.getElementById("numshowbtn");
  let button = navButtons.querySelectorAll("a");
  button.forEach((a) => {
    if (a.textContent == currentPage + 1) {
      a.classList.add("highlightBtn");
    }
    else {
      a.classList.remove("highlightBtn");
    }
  })
}

// Add validation


function validation() {

  let isvalid = true;

  const error = document.getElementsByClassName("error");


  const salutation = document.getElementById("Salutation");
  const firstName = document.getElementById("frst-Name");
  const lastName = document.getElementById("last-Name");
  const emailAddress = document.getElementById("email-address");
  const mobileNumber = document.getElementById("mobile-number");
  const dob = document.getElementById("dob");
  const qualification = document.getElementById("qualification");
  const address = document.getElementById("address");
  const country = document.getElementById("country");
  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const pinzip = document.getElementById("pinzip");
  const male = document.getElementById("exampleRadios1");
  const female = document.getElementById("exampleRadios2")
  const upload = document.getElementById("upload");
  const username = document.getElementById("username");
  const password = document.getElementById("password");


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
    let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mailvalid = inputdata.value.trim();
    if (inputdata.value === "") {
      error[num].innerHTML = msg;
      isvalid = false;
    
    }
    else if (!(mailvalid.match(emailregex))) {
      error[num].innerHTML = "enter a valid email"
      isvalid = false;

    }
    else {
      error[num].innerHTML = "";
    }
  }
  emailinput(emailAddress, 4, "enter your email address");

  // upload.addEventListener("input", () => { disablemsg(0) })
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
  return isvalid;
}



let searcharray = [];


// Edit validation

function editvalidation() {

  let isvalid = true;

  const editerror = document.getElementsByClassName("editerror");


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
      editerror[num].innerHTML = msg;
      isvalid = false;
    }
    else {
      editerror[num].innerHTML = "";
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
      male.focus();
      editerror[9].innerHTML = "select your gender";
      isvalid = false;
    }
    else {
      editerror[9].innerHTML = "";
    }

  }

  genderinput();

  const mobileinput = function (inputdata, num, msg) {
    let maxnum = inputdata.value.trim();

    if (inputdata.value === "") {
      inputdata.focus()
      editerror[num].innerHTML = msg;
      isvalid = false;
    }

    else if ((maxnum.length) != 10) {
      editerror[num].innerHTML = "enter valid number";
      isvalid = false;
    }
    else {
      editerror[num].innerHTML = "";
    }


  }

  mobileinput(mobileNumber, 5, "enter mobile number");

  const disablemsg = function (num) {
    editerror[num].innerHTML = "";
  }

  const diablegenderinput = function () {
    if (male.checked === true || female.checked === true) {
      editerror[9].innerHTML = "";

    }

  }
  male.addEventListener("input", () => { diablegenderinput() });
  female.addEventListener("input", () => { diablegenderinput() });

  diablegenderinput();

  const emailinput = function (inputdata, num, msg) {
    let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mailvalid = inputdata.value.trim();
    if (inputdata.value === "") {
      editerror[num].innerHTML = msg;
      isvalid = false;
    }
    else if (!(mailvalid.match(emailregex))) {
      editerror[num].innerHTML = "enter a valid email";
      isvalid = false;
    }
    else {
      editerror[num].innerHTML = "";
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


// User logout

const logout = document.getElementById("logout");
logout.addEventListener("click" ,()=>{
  fetch("http://localhost:3001/users/logout", {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      window.location.href = res.url;
    }
  });
});
