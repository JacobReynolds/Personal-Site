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
  'Rock Climber'
]
//.slice copies the array
var professionsTemp = professions.slice();
//Iterate through a temp array so each profession gets shown once before recycling.
$('#profession').hover(() => {
  if (professionsTemp.length === 0) {
    professionsTemp = professions.slice();
  }
  const tempProfIndex = Math.floor(Math.random() * professionsTemp.length);
  const tempProf = professionsTemp[tempProfIndex];
  professionsTemp.splice(tempProfIndex, 1);
  $('#profession').html(tempProf);
}, () => {})

//Shake it to imply hover effect
setTimeout(() => {
  $('#profession').effect('shake', {distance: 2});
}, 1000)
