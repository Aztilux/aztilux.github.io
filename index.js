var thud = new Audio('thud.mp3');
var fd1 = new Audio('fd1.mp3');
var key = new Audio('key.mp3');
var meoww = new Audio('meow.mp3')
fd1.loop = true
fd1.volume = 0.4
var started = false

$('*').click(function(event) {
  if (this === event.target && !started) { 
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
    setTimeout(() => { $('#start').show();  thud.play(); }, 2000);    
    new TypeIt("#start", {
      speed: 5,
      waitUntilVisible: true,
      afterStep: function() {
        const clone = key.cloneNode();
        clone.volume = 0.1
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
        .pause(1000) 
        .type("Azti")   
        .pause(5000) 
        .delete()
        .pause(1000)         
        .go()        
        setTimeout(() => { thud.play(); $("#title").animate( {'opacity': '1'}); }, 1000);
        setTimeout(() => { $("#subtitle").animate( {'opacity': '1'}); }, 2000);
        setTimeout(() => { $("ul").animate( {'opacity': '1'}); }, 3000);
        setTimeout(() => { $("#musictoggle").animate( {'opacity': '1'}); }, 4000);
        fd1.play()  
      }
  })
  .pause(1000)
  .type("<br>Load_System = { Azti's #!@#$D }")
  .type("<br>Loading page...")
  .type("<br>Starting audio = { Freddie Dredd: @#$$%*&#$&} ")
  .type("<br>Loading = ")
  .options({ speed: 100 })
  .type("[#######################]")
  .pause(3000)
  .empty()
  .options({ speed: 10 })
  .type("Azti??")
  .pause(2000)
  .go()
  }
}); 

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

function meow() {
  meoww.cloneNode().play()
}
