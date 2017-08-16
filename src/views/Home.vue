<template>
  <div>
    <div v-if="!gameStarted">
      <p>Welcome, how many color would you like to use</p>
      <input type="number" step="1" min="0" max="147" v-model="numColors"/>
      <button type="button" @click="play">Play Game</button>
    </div>
    <div v-else>
      <circles
        :elements="playedColors"
        v-on:chooseColor="chooseColor"
        :shuffledColors="shuffledColors">
      </circles>
      <button :disabled="shuffled" type="button" @click="shuffleCircles()"> Shuffle</button>
    </div>
    <div v-if="!playing && gameStarted">
      <div v-if="userWon">
        You have Won
        Do you want to play again? <button @click="increaseChallenge()" type="button">Play</button>
      </div>
      <div v-else>
        You have lost: The right order was:
        <ul>
          <li v-for="color in shuffledColors">
            {{ color }}
          </li>
        </ul>
        <button type="button" @click="startAgain()">Reset game</button>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/utils/game.utils';
import Circles from '@/components/Circles/Circles';

export default {
  name: 'home',
  data() {
    return {
      numColors: 0,
      playGame: false,
      colors: util.getColors(),
      playedColors: [],
      shuffledColors: [],
      selectedColors: [],
      userWon: false,
      playing: false,
      gameStarted: false,
      shuffled: false,
    };
  },
  components: {
    Circles,
  },
  methods: {
    play() {
      if (Number(this.numColors) <= 1) return;
      this.playedColors = this.generateSequence();
      this.gameStarted = !this.gameStarted;
      this.playing = true;
    },
    shuffleCircles() {
      this.shuffledColors = this.shuffle(this.playedColors.slice(0));
      this.shuffled = true;
    },
    shuffle(array) {
      const shuffleArr = array;

      for (let i = shuffleArr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmpArr = shuffleArr[i];
        shuffleArr[i] = shuffleArr[j];
        shuffleArr[j] = tmpArr;
      }

      return shuffleArr;
    },
    chooseColor(data) {
      this.selectedColors.push(data.color);
      if (this.selectedColors.length === this.shuffledColors.length) {
        this.gameFinish();
      }
    },
    gameFinish() {
      this.playing = false;
      this.userWon = this.hasWon();
    },
    hasWon() {
      return this.shuffledColors.every((color, index) => color === this.selectedColors[index]);
    },
    generateSequence() {
      const arrColors = [];

      for (let i = 0; i < this.numColors; i += 1) {
        arrColors.push(this.getRandomColor());
      }

      return arrColors;
    },
    increaseChallenge() {
      this.playedColors.push(this.getRandomColor());
      this.resetGame();
      this.shuffleCircles();
    },
    getRandomColor() {
      const randomNumber = util.getRandomNumber(1, this.colors.length);
      return this.colors[randomNumber];
    },
    resetGame() {
      this.shuffled = false;
      this.userWon = false;
      this.playing = true;
      this.selectedColors = [];
      this.shuffledColors = [];
    },
    startAgain() {
      this.resetGame();
      this.playedColors = [];
      this.gameStarted = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  padding: 0;
}

a {
  color: #42b983;
}
</style>
