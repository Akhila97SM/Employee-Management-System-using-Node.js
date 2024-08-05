
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
    const url = `http://localhost:3001/employees/trashsearchAndPagination?search=${searchQuery}&page=${page}&pagesize=${pagesize}`;
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
  