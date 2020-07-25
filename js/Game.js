class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    get activePlayer() {
        return this.players.find(player => player.active == true)
    }

    /**
     * Branches code, depending on what key player presses
     * @param   {Object}    e - Keydown event object
     */

    handleKeydown(e) {
        if (this.ready) {
                if (e.key === 'ArrowLeft') {
                    this.activePlayer.activeToken.moveLeft();
                } else if (e.key === 'ArrowRight') {
                    this.activePlayer.activeToken.moveRight(this.board.cols);
                } else if (e.key === 'ArrowDown' || e.key === ' ') {
                    this.playToken();
                }
                
            }
        }
    
    /** 
     * Creates two player objects
     * @return  {Array}    An array of two Player objects.
     */

    createPlayers() {
        const players = [
            new Player('Player 1', 1, '#e15258', true),
            new Player('Player 2', 2, '#e59a13')
        ];
        return players;
    }

    /** 
     * Initializes game. 
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;

    }

    playToken() {


        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation]; // specify x location
        let targetSpace = null;


        // check if column is full,
        for (let space of targetColumn) { // each iteration goes one column down
            if (space.token === null) {
                targetSpace = space;
            } // if space.token is never null, the column is full
        }

        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace, () => {
                this.updateGameState(activeToken, targetSpace);
            });
        }
    }

    /** 
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}    Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */

    //rows
    // Y
    // Y
    // Y
    //  XXXXXX cols


    switchPlayers(){
        for (const player of this.players) {
            if (player.active === true) {
                player.active = false;
            } else if (player.active === false) {
                player.active = true;
            }
        }
    }

    gameOver(message) {
        let htmlElement = document.getElementById('game-over');
        
        htmlElement.style.display = 'block';
        htmlElement.innerHTML = message;
    }

     /** 
     * Updates game state after token is dropped. 
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target){
        target.mark(token);
        if (this.checkForWin(target)) {
            this.gameOver('We have a winner! Check <a href="https://github.com/marcus2630/four-in-a-row">Github</a> for the source.');
        } else {
            this.switchPlayers();
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('All done bitches - no more tokens.');
            }
        }
    }

    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.cols; x++) { // going into the cols one at a time
            for (let y = 0; y < this.board.rows - 3; y++) { // once 3 rows are left, 4 in a row not possible
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                    }           
            }
        }

        // horizontal
        for (let x = 0; x < this.board.cols - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.cols; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

         // diagonal
        for (let x = 3; x < this.board.cols; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }

        return win;

    }



}