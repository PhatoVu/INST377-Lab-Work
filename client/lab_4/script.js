let slidePosition = 0;
const slides = document.querySelectorAll(".image");
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const totalSlides = slides.length;

console.log(slides)

prev.addEventListener('click', function(){
    moveToPrevSlide();
})

next.addEventListener('click', function(){
    moveToNextSlide();
})

function updatePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel_item-visible');
        slide.classList.add('carousel_item-hidden');  
    }

    slides[slidePosition].classList.add('carousel_item-visible');
}


function moveToPrevSlide(){
    if(slidePosition === 0) {
        slidePosition = totalSlides - 1;
    }

    else {
        slidePosition--;
    }

    updatePosition();
}


function moveToNextSlide(){
    if(slidePosition === totalSlides -1) {
        slidePosition = 0;
    }

    else {
        slidePosition++;
    }

    updatePosition();
}

