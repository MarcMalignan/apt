const APT_TIME = new Date('07/10/2020 00:00:00');

let timer;

const addZero = (nb) => nb < 10 ? `0${nb}` : nb;

const getClock = () => {
  const now = Date.now();
  const diff = APT_TIME.getTime() - now;

  if (diff <= 1000) return null;

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const daysms = diff % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = diff % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = diff % (60 * 1000);
  const seconds = Math.floor(minutesms / 1000);

  return {
    days,
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(seconds)
  };
};

const updateClock = () => {
  const clock = getClock();
  if (clock === null) {
    document.getElementById('countdown').classList.add('hidden');
    document.getElementById('apt').classList.remove('hidden');
    clearInterval(timer);
    return false;
  } else {
    document.getElementById('clock-days').innerHTML = clock.days;
    document.getElementById('clock-hours').innerHTML = clock.hours;
    document.getElementById('clock-minutes').innerHTML = clock.minutes;
    document.getElementById('clock-seconds').innerHTML = clock.seconds;
    return true;
  }
};

window.onload = () => {
  const startTimer = updateClock();
  if (startTimer) {
    timer = setInterval(updateClock, 1000);
  }
};