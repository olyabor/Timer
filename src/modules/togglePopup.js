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
export default togglePopup;