const toggleImage = () => {
    const command = document.getElementById('command');

    const handlerImage = (target) => {
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
      handlerImage(target);
    });

    command.addEventListener('mouseout', (e) => {
      const target = e.target;
      handlerImage(target);
    });
  };

  export default toggleImage;