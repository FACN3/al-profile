(() => {
  console.log("here");
  document.getElementById("file-input").onchange = () => {
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  };
})();

function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  console.log(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
    console.log(xhr.readyState+"  "+xhr.status);
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
          console.log("Succes")
            console.log(url);
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
