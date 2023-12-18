var thud = new Audio('thud.mp3');
var fd1 = new Audio('fd1.mp3');
var key = new Audio('key.mp3');
var meoww = new Audio('meow.mp3')
fd1.loop = true
fd1.volume = 0.2
key.volume = 0.1
var started = false
var finished = false

function startclicked() {
  if (!started) { 
    $( "#starter_div" ).remove();
    started = true
    $('#start').hide()
    $('#start').html(":// Login = guest")
    thud.cloneNode(true).play();
    $('#start').css({
      'left': '20px',
      'top': '10px',  
      'transform': 'translate(0%, 0%)',
      'text-align': 'left'       
    })  
    setTimeout(() => { $('#start').show(); }, 2000);    
    new TypeIt("#start", {
      speed: 5,
      waitUntilVisible: true,
      afterStep: function() {
        const clone = key.cloneNode();
        clone.volume = 0.05
        clone.play()
      },
      afterComplete: function() {
        $('#start').hide()
        new TypeIt("#title", {
          speed: 50,
          waitUntilVisible: true,
          loop: true,
          startDelete: true,
          startDelay: 5000
        })
        .type("4271X")
        .pause(5000) 
        .delete()
        .type("Azti")   
        .pause(5000) 
        .delete()       
        .go()        
        $('a').css({
          'pointer-events': 'all'
        })
        setTimeout(() => { $("#title").animate( {'opacity': '1'}); }, 1000);
        setTimeout(() => { $("#subtitle").animate( {'opacity': '1'}); }, 2000);
        setTimeout(() => { $("ul").animate( {'opacity': '1'}); }, 3000);
        setTimeout(() => { $("#musictoggle").animate( {'opacity': '1'}); $(".info").animate( {'opacity': '1'}); finished = true;}, 4000);
        updateTimer()
        fd1.play()  
      }
  })
  .pause(1000)
  .type("<br>Load_System = { Azti's #!@#$D }")
  .type("<br>Loading_page...")
  .type("<br>Starting audio = { CapzLock: D@#TSCYE } ")
  .type("<br>Loading = ")
  .options({ speed: 50 })
  .type("[#######################]")
  .pause(2000)
  .empty()
  .options({ speed: 10 })
  .type("Welcome.")
  .pause(1000)
  .go()
  }
}; 

var musict = true
function togglePlay() {
  if (musict) { 
    $('#musictoggle').html("Unmute");
    fd1.pause();
    musict = false;
  } else {
    $('#musictoggle').html("Mute");
    fd1.play();
    musict = true;
  }
}

var meow_counters = 0
function meow() {
  meoww.cloneNode().play()
  meow_counters = meow_counters + 1
  $('#meow_counter').html("meow_clicks = " + meow_counters)
}


// Function to format time as hh:mm:ss
function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;
  return (
      (hours < 10 ? "0" : "") + hours + ":" +
      (minutes < 10 ? "0" : "") + minutes + ":" +
      (secs < 10 ? "0" : "") + secs
  );
}

// Function to update the timer every second
function updateTimer() {
  let timerElement = document.getElementById('timer');
  let startTime = new Date().getTime();
  setInterval(function() {
      let currentTime = new Date().getTime();
      let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      timerElement.textContent = "time_in_page = " + formatTime(elapsedTimeInSeconds);
  }, 1000); // Update every second (1000 milliseconds)
}


function VisibilityChange() {
  if (document.hidden && finished) {
    $(fd1).animate({volume: 0}, 400);
    setTimeout(() => { fd1.pause(); }, 400);
  } else if (musict && finished) {
    fd1.play();
    $(fd1).animate({volume: 0.2}, 400);
  }
}
document.addEventListener("visibilitychange", VisibilityChange, false);