const color = function changeColorOfSomeHeadings(elements, newColor) {
  function changeColor(index) {
    const heading = elements[index].querySelector('.post__color-block');
    heading.style.background = newColor;
  }
  changeColor(0);
  for (let i = 3; i < elements.length; i += 4) {
    changeColor(i);
    if (elements[i + 1]) changeColor(i + 1);
  }
};

const makeBlocks = function generateBlocksWithDataFromExtSource(paras = 4) {
  if (paras <= 0) return;

  // Generate required amount of empty blocks
  const postTemplate = document.querySelector('.post_half');
  const postContainer = document.querySelector('.posts');
  for (let i = 0; i < paras; i += 1) {
    const duplicate = postTemplate.cloneNode(true);
    duplicate.classList.add('duplicate');
    postContainer.insertBefore(duplicate, null);
    duplicate.classList.add('visible');
  }
  const duplicates = postContainer.querySelectorAll('.duplicate');
  color(duplicates, '#FFC740');

  const request = urlT => new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', urlT);
    req.onload = () => {
      if (req.status >= 200 && req.status < 300) {
        resolve(req);
      } else {
        reject(req.statusText);
      }
    };
    req.onerror = () => reject(request.statusText);
    req.send();
  });

  const urlText = `https://baconipsum.com/api/?type=all-meat&paras=${paras}`;
  const urlImage = 'https://picsum.photos/200/?random';

  request(urlText).then((response) => {
    const paragraphs = JSON.parse(response.responseText);
    duplicates.forEach((duplicate, i) => {
      const textPlaceholder = duplicate.querySelector('.post__main-text');
      textPlaceholder.innerHTML = paragraphs[i];
    });
  });

  duplicates.forEach((duplicate) => {
    request(urlImage).then((response) => {
      const imagePlaceholder = duplicate.querySelector('.post__image');
      imagePlaceholder.style.background = `url('${response.responseURL}')`;
      imagePlaceholder.style.backgroundSize = 'cover';
    });
  });
};

makeBlocks(8);
