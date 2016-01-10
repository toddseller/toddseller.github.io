function displayMethod(id) {
  document.getElementById(id).classList.add('display');
  document.getElementById(id).classList.remove('hidden');
  document.getElementById('instructions').classList.add('hidden');
  document.getElementById('instructions').classList.remove('display')
  window.onscroll = function() {scrollArrays()};
}
function hideMethod(id) {
  document.getElementById(id).classList.add('hidden');
  document.getElementById(id).classList.remove('display');
  document.getElementById('instructions').classList.add('display');
  document.getElementById('instructions').classList.remove('hidden')
}
function scrollArrays() {
    if (document.body.scrollTop > 224 || document.documentElement.scrollTop > 224) {
        document.getElementById('arrays').classList.add('example2');
    } else {
        document.getElementById('arrays').classList.remove('example2');
    }
}