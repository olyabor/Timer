const countTimer = (deadline) => {
  const timerHours = document.getElementById('timer-hours'),
    timerMinutes = document.getElementById('timer-minutes'),
    timerSeconds = document.getElementById('timer-seconds');

  const getTimeRemaining = () => {
    let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = dateStop > dateNow ? (dateStop - dateNow) / 1000 : 0,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);
    return { timeRemaining, hours, minutes, seconds };
  };

  const addNull = (n) => (n < 10 ? '0' + n : n);

  const updateClock = () => {
    let timer = getTimeRemaining();

    timerHours.textContent = addNull(timer.hours);
    timerMinutes.textContent = addNull(timer.minutes);
    timerSeconds.textContent = addNull(timer.seconds);

    if (timer.timeRemaining > 0) {
      setInterval(updateClock, 1000);
    }
  };

  updateClock();
};

export default countTimer;
