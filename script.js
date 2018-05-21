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

  const urlText = `https://baconipsum.com/api/?type=all-meat&paras=${paras}`;
  const urlImage = 'https://picsum.photos/200/?random';

  function insertText(url) {
    const requestText = new XMLHttpRequest();
    requestText.open('GET', url);
    requestText.send();
    requestText.onreadystatechange = () => {
      if (requestText.readyState === 4) {
        const paragraphs = JSON.parse(requestText.responseText);
        duplicates.forEach((duplicate, i) => {
          const textPlaceholder = duplicate.querySelector('.post__main-text');
          textPlaceholder.innerHTML = paragraphs[i];
        });
      }
    };
  }

  function insertImage(url, placeholder) {
    const requestImage = new XMLHttpRequest();
    requestImage.open('GET', url);
    requestImage.send();
    requestImage.onreadystatechange = () => {
      if (requestImage.readyState === 4) {
        const imagePlaceholder = placeholder.querySelector('.post__image');
        imagePlaceholder.style.background = `url('${
          requestImage.responseURL
        }')`;
        imagePlaceholder.style.backgroundSize = 'cover';
      }
    };
  }

  insertText(urlText);

  duplicates.forEach(duplicate => insertImage(urlImage, duplicate));
};

makeBlocks(5);
