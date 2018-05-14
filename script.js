let color = function changeColorOfSomeHeadings (elements){

}



let makeBlocks = function generateBlocksWithDataFromExtSource(paras = 4) {
  if (paras < 0) paras = 0;
  const postTemplate = document.querySelector(".post_half");
  const postContainer = document.querySelector(".posts");
  for (i = 0; i < paras; i += 1) {
    let duplicate = postTemplate.cloneNode(true);
    duplicate.classList.add("duplicate");
    postContainer.insertBefore(duplicate, null);
  }
  let duplicates = postContainer.querySelectorAll(".duplicate");
  //color(duplicates, 'yellow');

  let requestText = new XMLHttpRequest();
  let urlText = "https://baconipsum.com/api/?type=all-meat&paras=" + paras;
  requestText.open("GET", urlText);
  requestText.send();
  requestText.onreadystatechange = () => {
    if (requestText.readyState === 4) {
      let extPage;
      extPage = JSON.parse(requestText.responseText); // extPages
      duplicates.forEach((duplicate, i) => {
        let textPlaceholder = duplicate.querySelector(".post__main-text");
        textPlaceholder.innerHTML = extPage[i];
      });
      
      duplicates.forEach(duplicate => {
        let requestImage = new XMLHttpRequest();
        let urlImage = "https://picsum.photos/200/?random";
        requestImage.open("GET", urlImage);
        requestImage.send();
        requestImage.onreadystatechange = () => {
          if (requestImage.readyState === 4) {
            let imagePlaceholder = duplicate.querySelector(".post__image");
            imagePlaceholder.style.background = "url("+requestImage.responseURL+")";
            duplicate.style.display = "flex";

          }
        };
      });
      
    }
  };


  
};

makeBlocks();
