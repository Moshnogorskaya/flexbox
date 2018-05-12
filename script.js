let makeBlocks = function generateBlocksWithDataFromExtSource(paras) {
  const postTemplate = document.querySelector(".post_half");
  const postContainer = document.querySelector(".posts");

  let request = new XMLHttpRequest();
  let uRl = "https://baconipsum.com/api/?type=all-meat&paras=" + paras;
  request.open("GET", uRl);
  request.send();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      let extPage;
      extPage = JSON.parse(request.responseText);

      for (let i = 0; i < paras; i += 1) {
        let dupPost = postTemplate.cloneNode(true);
        let textPlaceholder = dupPost.querySelector('.post__main-text');
        textPlaceholder.innerHTML = extPage[i];
        dupPost.style.display = "flex";
        postContainer.insertBefore(dupPost, null);
      }
    }
  };
};

makeBlocks(3);
