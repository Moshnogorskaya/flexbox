let makeBlocks = function generateBlocksWithDataFromExtSource(paras=4) {
  if (paras < 0 || paras > 5) paras = 0;
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
        let textPlaceholder = dupPost.querySelector(".post__main-text");
        let imagePlaceholder = dupPost.querySelector('.post__image');
        textPlaceholder.innerHTML = extPage[i];
        imagePlaceholder.style.backgroundImage = "url('https://picsum.photos/200/?random')";
        dupPost.style.display = "flex";
        postContainer.insertBefore(dupPost, null);
      }
    }
  };
};

makeBlocks(3);
