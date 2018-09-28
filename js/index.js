$(document).ready(function() {
  $("#min").html(pomodoro.toDoubleDigit(pomodoro.minutes));
  $("#sec").html(pomodoro.toDoubleDigit(pomodoro.seconds));
  $("#begin").html(pomodoro.beginState);
  $("#ses").html(pomodoro.sessionState);
  pomodoro.init();
});

var pomodoro = {
  sessionState: "new",
  beginState: "begin",
  setTime: 25,
  started: false,
  minutes: 25,
  seconds: 0,
  interval: null,
  secDom: null,
  minDom: null,
  init: function() {
    var self = this;

    this.minDom = document.querySelector("#min");
    this.secDom = document.querySelector("#sec");

    this.interval = setInterval(function() {
      self.intervalCallback.apply(self);
    }, 1000);

    document.querySelector("#begin").onclick = function() {
      self.startTimer.apply(self);
    };
    document.querySelector("#sBreak").onclick = function() {
      self.startShortBreak.apply(self);
    };
    document.querySelector("#lBreak").onclick = function() {
      self.startLongBreak.apply(self);
    };
    document.querySelector("#ses").onclick = function() {
      self.sessionTimer.apply(self);
    };
    document.querySelector("#down-btn").onclick = function() {
      self.lowerTimer.apply(self);
    };
    document.querySelector("#up-btn").onclick = function() {
      self.raiseTimer.apply(self);
    };
  },
  startTimer: function() {
    if (this.started === true) {
      this.started = false;
    } else {
      this.started = true;
    }

    if (this.minutes === 25 && this.seconds === 0) {
      this.started = true;
    } else if (this.minutes === 0 && this.seconds === 0) {
      this.minutes = 25;
      this.seconds = 0;
      $("#min").html(pomodoro.toDoubleDigit(this.minutes));
      $("#sec").html(pomodoro.toDoubleDigit(this.seconds));
    }
    pomodoro.pause();
    pomodoro.setButton();
  },
  startShortBreak: function() {
    this.minutes = 5;
    this.seconds = 0;
    $("#min").html(pomodoro.toDoubleDigit(this.minutes));
    $("#sec").html(pomodoro.toDoubleDigit(this.seconds));
    this.started = false;
    pomodoro.pause();
    pomodoro.setButton();
  },
  startLongBreak: function() {
    this.minutes = 15;
    this.seconds = 0;
    $("#min").html(pomodoro.toDoubleDigit(this.minutes));
    $("#sec").html(pomodoro.toDoubleDigit(this.seconds));
    this.started = false;
    pomodoro.pause();
    pomodoro.setButton();
  },
  sessionTimer: function() {
    if (pomodoro.sessionState === "set") {
      pomodoro.setTime = pomodoro.minutes;
    }
    this.started = false;
    pomodoro.seconds = 0;

    $("#min").html(pomodoro.toDoubleDigit(this.setTime));
    $("#sec").html(pomodoro.toDoubleDigit(this.seconds));
    pomodoro.pause();
    pomodoro.setButton();
  },
  lowerTimer: function() {
    pomodoro.minutes -= 1;
    pomodoro.sessionState = "set";
    pomodoro.pause();
    $("#min").html(this.toDoubleDigit(pomodoro.minutes));
    $("#ses").html(pomodoro.sessionState);
  },
  raiseTimer: function() {
    pomodoro.minutes += 1;
    pomodoro.sessionState = "set";
    pomodoro.pause();
    $("#min").html(this.toDoubleDigit(pomodoro.minutes));
    $("#ses").html(pomodoro.sessionState);
  },
  toDoubleDigit: function(number) {
    if (number < 10) {
      return "0" + parseInt(number, 10);
    }
    return number;
  },
  updateDom: function() {
    this.minDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secDom.innerHTML = this.toDoubleDigit(this.seconds);
  },
  intervalCallback: function() {
    if (!this.started) {
      return false;
    } else if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  pause: function() {
    if (pomodoro.started === false) {
      pomodoro.beginState = "begin";
      $("#begin").html(pomodoro.beginState);
    } else if (pomodoro.started === true) {
      pomodoro.beginState = "pause";
      $("#begin").html(pomodoro.beginState);
    }
  },
  alarm: function() {},
  setButton: function() {
    pomodoro.sessionState = "new";
    $("#ses").html(pomodoro.sessionState);
  },
  timerComplete: function() {
    this.started = false;
    this.alarm();
  }
};

/*
window.onload = function() {
  pomodoro.init();
};
*/