window.addEventListener('DOMContentLoaded', function(){
  ('use strict');
  const addNull = (n) => (n < 10 ? '0' + n : n);
  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = dateStop > dateNow ? (dateStop - dateNow) / 1000 : 0,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
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
  //кнопка для перемещения на следующий слайд
  const btnClick = document.querySelector(`main a`);
  //плавная прокрутка
  const handlerClick = (e) => {
    const blockId = e.target.getAttribute('href').substr(1);
    e.preventDefault();
    document.getElementById(blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  btnClick.addEventListener('click', (e) => handlerClick(e));
  // меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu'),
      body = document.querySelector('body');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    body.addEventListener('click', (event) => {
      let target = event.target;
        if (target.closest('ul>li') && target.matches('a')) {
            handlerClick(event);
        }
          if (
            target.closest('.menu') ||
            (!target.classList.contains('menu') &&
              !target.classList.contains('active-menu') &&
              menu.classList.contains('active-menu'))
          ) {
            handlerMenu();
          }
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
        let movePopup = function () {
          flyInterval = requestAnimationFrame(movePopup);
          count++;
          if (count < 38) {
            popupContent.style.left = count + '%';
          } else {
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

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
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
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
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
});