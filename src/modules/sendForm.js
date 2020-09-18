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

export default sendForm;