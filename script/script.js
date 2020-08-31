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
            return {timeRemaining, hours, minutes, seconds}
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
});