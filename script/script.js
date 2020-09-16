window.addEventListener('DOMContentLoaded', function(){
  'use strict';
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

  //плавная прокрутка
  const handlerClick = (e) => {
    const blockId = e.target.getAttribute('href').substr(1);
    e.preventDefault();
    document.getElementById(blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu'),
      body = document.querySelector('body');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    body.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('ul>li') && target.matches('menu a')) {
        handlerClick(event);
      }
      if (
        target.closest('.menu') ||
        (!target.classList.contains('menu') &&
          !target.classList.contains('active-menu') &&
          !target.matches('.active-menu li') &&
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

  // слайдер

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

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (
        event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')
      ) {
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

  //Блок с картинками Наша Команда
  const command = document.getElementById('command');

  const toggleImage = (target) => {
    if (target.closest('.command__photo')) {
      const imageSrc = target.closest('.command__photo').src;
      target.closest('.command__photo').src = target.closest(
        '.command__photo'
      ).dataset.img;
      target.closest('.command__photo').dataset.img = imageSrc;
    }
  };

  command.addEventListener('mouseover', (e) => {
    const target = e.target;
    toggleImage(target);
  });

  command.addEventListener('mouseout', (e) => {
    const target = e.target;
    toggleImage(target);
  });

  // калькулятор
  const calcInput = document.getElementById('calc').querySelectorAll('input');
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = Math.round(total);
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };

  calc(100);

  calcInput.forEach((item) => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/g, '');
    });
  });

  //send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы с вами свяжемся!',
      patternPhone = /^\+?\d+$/;

    const form = document.getElementById('form1'),
      form2 = document.getElementById('form2'),
      form3 = document.getElementById('form3');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });
    };

    const valid = (input) => {
      let flag = true;
      input.forEach((elem) => {
        if (elem.type === 'tel' && !patternPhone.test(elem.value)) {
          elem.style.border = 'solid red';
          flag = false;
        }
      });
      return flag;
    };

    const sendData = (event) => {
      const form = event.target,
        input = form.querySelectorAll('input');
      event.preventDefault();
      if (valid(input)) {
        form.append(statusMessage);
        if (form === form3) {
          statusMessage.style.cssText = 'font-size: 2rem; color: white;';
        }
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body)
          .then((statusMessage.textContent = loadMessage))
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network is not 200');
            }
            statusMessage.textContent = successMessage;
          })
          .then(
            form.addEventListener('click', () => {
              statusMessage.textContent = '';
            })
          )
          .then(
            setTimeout(() => {
              statusMessage.textContent = '';
            }, 10000)
          )
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
        input.forEach((item) => {
          item.value = '';
          item.style.border = '';
        });
      }
    };

    form.addEventListener('submit', sendData);
    form2.addEventListener('submit', sendData);
    form3.addEventListener('submit', sendData);
  };
  const message = document.querySelector('.mess');
  message.addEventListener('input', () => {
    message.value = message.value.replace(/[^а-я\s]/gi, '');
  });

  sendForm();
});