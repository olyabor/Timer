window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    const addNull = n => n < 10 ? '0' + n : n;
    //Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
        
        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = dateStop > dateNow ? (dateStop - dateNow) / 1000 : 0,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock(){
            let timer = getTimeRemaining();

            timerHours.textContent = addNull(timer.hours);
            timerMinutes.textContent = addNull(timer.minutes);
            timerSeconds.textContent = addNull(timer.seconds);

            if (timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            }
        }

        updateClock();
    }

    countTimer('02 Septmber 2020');

    // меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        menu.addEventListener('click', (event) => {
            let target = event.target;

            if (
              target.classList.contains('close-btn') ||
              (target.offsetParent && target.offsetParent.tagName === 'MENU')
            ) {
              handlerMenu();
            }
        });

        btnMenu.addEventListener('click', (event) => {
            handlerMenu();
        });
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                const width = document.documentElement.clientWidth;
                popup.style.display = 'block';
                let flyInterval,
                    count = 0;
                let movePopup = function(){
                    flyInterval = requestAnimationFrame(movePopup);
                    count++;
                    if(count < 38){
                        popupContent.style.left = count + '%';
                    }else{
                        cancelAnimationFrame(flyInterval);
                    }
                };
                if (width > 768) {
                    flyInterval = requestAnimationFrame(movePopup);
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if(!target){
                    popup.style.display = 'none';
                }
            }
        });
        
    };

    togglePopup();

    // табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
        let target = event.target;
            target = target.closest('.service-header-tab');

        if (target) {
            tab.forEach((item, i) => {
                if (item === target) {
                toggleTabContent(i);
                }
            });
        }
        });
    };

    tabs();

    // табы

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval,
            dots = '';

        for (let i = 1; i < slide.length; i++) {
          dots += '<li class="dot"></li>';
        }

        slider.insertAdjacentHTML(
          'beforeend',
          `<ul class="portfolio-dots">
				<li class="dot dot-active"></li>${dots}
			</ul>`
        );

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            }else if (target.matches('#arrow-left')){
                currentSlide--;
            }else if (target.matches('.dot')){
                dot.forEach((elem, index) => {
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length){
                currentSlide = 0;
            }

            if (currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (
              event.target.matches('.portfolio-btn') ||
              event.target.matches('.dot')
            ) {
              startSlide();
            }
        });

        startSlide(1500);

    };

    slider();
});