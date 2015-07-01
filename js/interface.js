MIGACE.namespace('interface');

MIGACE.interface = (function() {
  var newGameBtn = document.getElementById('new-game');

  newGameBtn.addEventListener('click', function() {
    MIGACE.game.init();
  }, false);
})();
