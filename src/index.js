import './style.scss';

let slides = document.querySelectorAll('.slider__slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide,3000);
function nextSlide() {
slides[currentSlide].className = 'slider__slide';

// используем оператор % на случай, если это был последний слайд, чтобы вернуться к первому
currentSlide = (currentSlide+1)%slides.length;
slides[currentSlide].className = 'slider__slide showing';
}