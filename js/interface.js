MIGACE.namespace('interface');

MIGACE.interface = (function() {
  var newGameBtn = document.getElementById('new-game'),
      updateScore;

  newGameBtn.addEventListener('click', function() {
    MIGACE.game.init();
  }, false);

  updateScore = function(newScores) {
    if (typeof newScores === 'undefined') {
      return false;
    }

    var scores = document.getElementById('score'),
        oldScores = scores.innerHTML;

    scores.innerHTML = '';
    scores.innerHTML = parseInt(oldScores) + parseInt(newScores);
  };

  return {
    updateScore: updateScore
  };
})();
