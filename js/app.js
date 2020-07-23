const beginGameButton = document.getElementById('begin-game');


const game = new Game();

/** 
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
beginGameButton.addEventListener('click', () => {
    game.startGame();
    beginGameButton.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});


document.addEventListener('keydown', function(event) {
    game.handleKeydown(event);
});