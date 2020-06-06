const APT_START = new Date('07/10/2020 00:00:00');
const APT_END = new Date('07/19/2020 00:00:00');

let timer;

const addZero = (nb) => nb < 10 ? `0${nb}` : nb;

const getClock = (diff) => {
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

const updateClock = (clock) => {
  document.getElementById('countdown').classList.remove('hidden');
  document.getElementById('clock-days').innerHTML = clock.days;
  document.getElementById('clock-hours').innerHTML = clock.hours;
  document.getElementById('clock-minutes').innerHTML = clock.minutes;
  document.getElementById('clock-seconds').innerHTML = clock.seconds;
}

const doApt = () => {
  document.body.classList.add('apt');
  document.body.classList.remove('end');
  document.getElementById('countdown').classList.add('hidden');
  document.getElementById('apt').classList.remove('hidden');
  document.getElementById('end').classList.add('hidden');
}

const doEnd = () => {
  document.body.classList.remove('apt');
  document.body.classList.add('end');
  document.getElementById('countdown').classList.add('hidden');
  document.getElementById('apt').classList.add('hidden');
  document.getElementById('end').classList.remove('hidden');
}

const timerAction = () => {
  const now = Date.now();
  const diffStart = APT_START.getTime() - now;
  const diffEnd = APT_END.getTime() - now;

  if (diffEnd <= 0) {
    doEnd();
    clearInterval(timer);
    return false;
  }

  if (diffStart <= 1000) {
    doApt();
    return true;
  }

  const clock = getClock(diffStart);
  updateClock(clock);
  return true;
};

window.onload = () => {
  const startTimer = timerAction();
  if (startTimer) {
    timer = setInterval(timerAction, 1000);
  }
};