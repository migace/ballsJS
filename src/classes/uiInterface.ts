import Game from './game';

class UiInterface {
  private static instance: UiInterface;
  newGameBtn: HTMLElement;
  game: Game;
  scores: number;

  private constructor() {
    this.newGameBtn = document.getElementById('new-game');
    this.scores = 0;    

    this.newGameBtn.addEventListener('click', () => {      
      this.game = Game.getInstance();
      this.game.init();
    }, false);
  }

  static getInstance() {
    if (!UiInterface.instance) {
      UiInterface.instance = new UiInterface();
    }

    return UiInterface.instance;
  }

  updateScore(scores: number) {
    const scoresElement = document.getElementById('score'),
          oldScores = scoresElement.innerText;

    this.scores = +oldScores + +scores;

    scoresElement.innerText = String(this.scores);
  };
}

export default UiInterface;
