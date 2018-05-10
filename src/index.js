import './style.scss';

const slides = document.querySelectorAll('.slider__slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].className = 'slider__slide';

  // используем оператор % на случай, если это был последний слайд, чтобы вернуться к первому
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = 'slider__slide showing';
}

setInterval(nextSlide, 3000);
