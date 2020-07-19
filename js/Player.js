class Player {
    constructor(name, id, color, active = false) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21);
    }


    /**
    * Creates token objects for player
    * @param     {amount}    amount - Number of token objects to be created
    * @returns   {Array}     An array of the newly created token objects
    * http://usejsdoc.org/
    */
    createTokens(amount) {
        const batch = [];

        for (var i = 0; i <= amount; i++) {
            const token = new Token(i, this);
            batch.push(token);
        }

        return batch
    }

    get unusedTokens() {

        //token.dropped does != true / aka. token.dropped == false
        return this.tokens.filter(token => !token.dropped);
    }

    get activeToken() {
        return this.unusedTokens[0];
    }


}