
var form = document.getElementById('form');

(() => {
  var btn = document.getElementById("myBtn");
  var modal = document.getElementById("myform");
  btn.onclick = function() {
    modal.style.display = "block";
  };

  document.getElementById("file-input").onchange = () => {
    const files = document.getElementById("file-input").files;
    const file = files[0];
    if (file == null) {
      return alert("No file selected.");
    }
    getSignedRequest(file);
  };

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    checkIfUserExists();
  });
})();

function getSignedRequest(file) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      } else {
        alert("Could not get signed URL.");
      }
    }
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById("image_url").value = url;
      } else {
        alert("Could not upload file.");
      }
    }
  };
  xhr.send(file);
}

function checkIfUserExists() {
  let username = document.getElementById('username').value;
  if (username) {
    fetch("/check_user?username=" + username, "GET",
    function(response) {
      var result = JSON.parse(response);
      if(result.available){
        form.submit();
      }else{
        errorMessage("The username already exists.");
      }
    });
  } else {
    errorMessage("Please fill in the username");
  }
}

function fetch(url, method, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      cb(xhr.responseText);
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}




function errorMessage(errMessage) {
  var message = document.createElement("h2");
  message.innerHTML = errMessage;
  document.getElementById('err_message').appendChild(message);
}
