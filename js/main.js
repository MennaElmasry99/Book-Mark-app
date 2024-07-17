var SiteName = document.getElementById('SiteName');
var siteUrl = document.getElementById('siteUrl');
var urlContainer;

function validateUrl() {
  var errorMessage = document.getElementById('errorMessage');

  var urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,4}))+(\/[a-zA-Z0-9#]+\/?)*$/;
  if (!urlPattern.test(siteUrl.value)) {
    errorMessage.style.display = 'block';
    return false;
  } else {
    errorMessage.style.display = 'none';
    return true;
  }
}

if (localStorage.getItem("bookmark") == null) {
  urlContainer = [];
} else {
  urlContainer = JSON.parse(localStorage.getItem('bookmark'));
  displayUrl();
}

function submitUrl() {
  if (!validateUrl()) {
    return;
  }

  var bookmark = {
    Name: SiteName.value,
    url: siteUrl.value,
  };

  urlContainer.push(bookmark);
  clearForm();
  displayUrl();
  localStorage.setItem('bookmark', JSON.stringify(urlContainer));
}

// Function to clear inputs
function clearForm() {
  SiteName.value = "";
  siteUrl.value = "";
}

function displayUrl() {
  var cartoona = ``;
  for (var i = 0; i < urlContainer.length; i++) {
    cartoona += `<tr>
                <td>${i + 1}</td>
                <td>${urlContainer[i].Name}</td>              
                <td>
                  <button class="btn btn-visit bg-success text-white" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2 text-white"></i><a href="${urlContainer[i].url}" target="_blank">visit</a>
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2 bg-danger text-white" data-index="${i}" onclick="deleteRow(${i})">
                    <i class="fa-solid fa-trash-can text-white"></i>
                    Delete
                  </button>
                </td>
            </tr>`;
  }
  document.getElementById('tableContent').innerHTML = cartoona;
}

function deleteRow(deleteIndex) {
  urlContainer.splice(deleteIndex, 1);
  displayUrl();
  localStorage.setItem('bookmark', JSON.stringify(urlContainer));
}
