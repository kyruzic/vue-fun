var icons = ['fas fa-dice-one', 'fas fa-dice-two', 'fas fa-dice-three', 'fas fa-dice-four', 'fas fa-dice-five', 'fas fa-dice-six'];

Vue.component('dice-game', {
    props: {
        gameTitle: String
    },
    template: 
        `<div class="dice-game">
            <h4>{{ gameTitle }}</h4>
            <slot></slot>
        </div>`
})

var highRoll = new Vue({
    el: '#high-roll',

    data: {
        gameName: 'High Roll',
        bet: 1,
        level: 1,
        maxLevel: 5,
        enemyGold: 10,
        playerGold: 50,
        newRoll: 0,
        player1: {
            value: null,
            iconName:'fas fa-dice',
        },
        player2: {
            value: null,
            iconName: 'fas fa-dice',
        }
    },

    computed: {
        win: function() {
            return this.player2.value - this.player1.value
        },
        levelPercentage: function() {
            return this.level/this.maxLevel*100
        }
    },


    methods: {
        roll: function(bet = 1) {
            bet = parseInt(bet, 10);
            this.player1.value = (Math.floor(Math.random() *5)+1);
            this.player2.value = 6;//(Math.floor(Math.random() *5)+1);

            this.player1.iconName = icons[this.player1.value-1];
            this.player2.iconName = icons[this.player2.value-1]

            if (this.player2.value > this.player1.value) {
                this.playerGold += bet; 
                this.enemyGold -= bet
                if(this.enemyGold < 1) {
                    this.getNewOpponent()
                }
            }
            else if(this.player2.value < this.player1.value) {
                this.playerGold -= bet; 
                this.enemyGold += bet
            }
            this.newRoll = 1
        },
        tryAgain: function() {
            this.player1.value = null;
            this.player2.value = null;

            this.player1.iconName = 'fas fa-dice';
            this.player2.iconName = 'fas fa-dice';
            this.newRoll = 0
        },
        getNewOpponent: function() {
            if (this.level > this.maxLevel) {
                this.gameOver()
            }
            this.level++
            this.enemyGold = 10 * this.level
        },
        gameOver: function() {

        }
    }
})