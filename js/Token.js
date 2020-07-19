class Token {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
    }

    drawHTMLToken() {

        const token = document.createElement('div');

        // Mess with game board underlay
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;

    }

    get htmlToken() {
        return document.getElementById(this.id);
    }
}

/* Token brainstorm

-playerId - owner
-position
-placeTokenAction
-id ofcourse


*/