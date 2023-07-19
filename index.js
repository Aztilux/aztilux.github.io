var thud = new Audio('thud.mp3');
var fd1 = new Audio('fd1.mp3');
fd1.loop = true
fd1.volume = 0.5
var started = false

$('*').click(function(event) {
  if (this === event.target && !started) { 
    started = true
    $('#title').hide()
    $('#title').html(":// Login = guest")
    thud.cloneNode(true).play();
    $('#title').css({
      'left': '20px',
      'top': '10px',  
      'transform': 'translate(0%, 0%)',
      'text-align': 'left'       
    })  
    setTimeout(() => { $('#title').show();  thud.play(); }, 2000);    
    new TypeIt("#title", {
      speed: 10,
      waitUntilVisible: true,
      afterComplete: function() {
        $('#title').hide()
        $('#title').css({
          'transform': 'translate(-50%, -50%)', 
          'left': '50%', 
          'top': '45%', 
          "font-size": '125%',               
        })        
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
        setTimeout(() => { $('#title').show(); thud.play(); $("#subtitle").animate({'opacity': '1'});}, 1000);
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