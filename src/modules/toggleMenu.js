//плавная прокрутка
const handlerClick = (e) => {
  const blockId = e.target.getAttribute('href').substr(1);
  e.preventDefault();
  document.getElementById(blockId).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
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

export default toggleMenu;