//Flags to identify if the element has been hovered on, this tells us to stop shaking
var professionHovered = false;
var peekabooHovered = false;
//A function that continuously increases the shaking intensity and delay of an element.
//Stops one the this[hoverCheck] variable is set to true
function violentShake(id, delay, distance, hoverCheck) {
  delay *= 1.2;
  distance = distance * 2;
  if (distance > 10) { //Set a max distance
    distance=10;
  }
  //If only IE supported arrow notation...
  setTimeout(function() {
    //Check if the shakee has been hovered.  If it has, stop looping.
    if (!window[hoverCheck]) {
      $('#' + id).effect('shake', {distance})
      violentShake(id, delay, distance, hoverCheck);
    }
  }, delay)
}
//Kick off the profession shake
violentShake('profession', 2000, 2, 'professionHovered');

//List of "professions"
const professions = [
  'Full-Stack Web Developer',
  'Free-Lance Everything',
  'Go-To Computer Guy',
  'Future Tech Billionaire',
  'Arduino Tinkerer',
  'HAB Enthusiast',
  'Scuba Diver',
  'Blogger',
  '&#9994; Unicode Lover',
  'Rock Climber',
  'Sr. Security Consultant'
]
//.slice copies the array by value
var professionsTemp = professions.slice();
//On hoverin cycle the profession
$('#profession').hover(cycleProfession, () => {});
//On click cycle the profession
$('#profession').click(cycleProfession);
//The first time profession is hovered, set the flag to true and begin main pic shake
$('#profession').one("mouseenter", function() {
  professionHovered = true;
  setTimeout(function() {
    violentShake('mainPic', 1000, 2, 'peekabooHovered')
  }, 6000)
})
//The first time main pic is hovered, set the flag to true.
$('#mainPic').one('mouseenter', function() {
  peekabooHovered = true;
})
//Iterate through a temp array so each profession gets shown once before recycling.
function cycleProfession() {
  if (professionsTemp.length === 0) {
    professionsTemp = professions.slice();
  }
  const tempProfIndex = Math.floor(Math.random() * professionsTemp.length);
  const tempProf = professionsTemp[tempProfIndex];
  professionsTemp.splice(tempProfIndex, 1);
  $('#profession').html(tempProf);
}

//Add peekaboo hover listener
$('#mainPic').hover(peekaboo, peekaRemoo);
//Array of peekabooObject attached to the DOM
var peekabooObjects = [];
//How long peekaboo animations last
var peekabooMillis = 1500;
//Insert an image into a random corner, and bring it halfway into view
function peekaboo() {
  var animationObject = getPeekabooAnimationObject();
  var imageHtml = $('#mainPic')[0].outerHTML;
  $(imageHtml).appendTo('body').addClass('peekaboo').attr('id', animationObject.id).css({
    transform: 'rotate(' + animationObject.turn + 'deg)',
    left: animationObject.left,
    top: animationObject.top
  })
  $('#' + animationObject.id).animate({
    top: animationObject.topAnimate,
    left: animationObject.leftAnimate
  }, peekabooMillis)
  peekabooObjects.push(animationObject)
}

//Remove the oldest peekaboo object
function peekaRemoo() {
  var animationObject = peekabooObjects.shift();
  $('#' + animationObject.id).stop().animate({
    top: animationObject.top,
    left: animationObject.left
  }, 200)
  setTimeout(function() {
    $('#' + animationObject.id).remove();
  }, 300)
}

//Get various characteristics for a peekaboo animation object
function getPeekabooAnimationObject(rand) {
  //Get 0-3 to represent each corner of the screen
  var rand = Math.floor(Math.random() * 4);
  var imageHeight = $('#mainPic').innerHeight();
  var imageWidth = $('#mainPic').innerWidth();
  var viewWidth = $(window).width();
  var viewHeight = $(window).height();
  var animationObject = {};
  switch (rand) {
    case 0:
      return animationObject = {
        turn: -135, //How far to rotate the image
        top: -imageHeight, //Top position
        topAnimate: -imageHeight / 2, //Top position to animate to
        left: viewWidth, // Left position
        leftAnimate: viewWidth - (imageWidth / 2), //Left position to animate to
        id: 'peekaObject' + new Date().getTime() //Unique ID for the object
      }
    case 1:
      return animationObject = {
        turn: -45,
        top: viewHeight,
        topAnimate: viewHeight - (imageHeight / 2),
        left: viewWidth,
        leftAnimate: viewWidth - (imageWidth / 2),
        id: 'peekaObject' + new Date().getTime()
      }
    case 2:
      return animationObject = {
        turn: 45,
        top: viewHeight,
        topAnimate: viewHeight - (imageHeight / 2),
        left: -imageWidth,
        leftAnimate: -imageWidth / 2,
        id: 'peekaObject' + new Date().getTime()
      }
    case 3:
      return animationObject = {
        turn: 135,
        top: -imageHeight,
        topAnimate: -imageHeight / 2,
        left: -imageWidth,
        leftAnimate: -imageWidth / 2,
        id: 'peekaObject' + new Date().getTime()
      }
  }
}
