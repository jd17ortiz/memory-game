<template lang="html">
  <ul class="Circles" v-flash="shuffledColors">
    <li
      class="Circles__item"
      v-for="(color, index) in elements"
      v-bind:style="{ background: color }"
      v-on:click="guessing(color)"
      :id="color">
    </li>
  </ul>
</template>

<script>
import Flash from '@/directives/Flash';

export default {
  props: {
    elements: {
      required: true,
      type: Array,
    },
    shuffledColors: {
      required: true,
      type: Array,
    },
  },
  methods: {
    guessing(color) {
      if (!this.shuffledColors.length) {
        alert('You have to shuffle first');
        return;
      }
      this.$emit('chooseColor', { color });
    },
  },
  directives: {
    Flash,
  },
};
</script>

<style lang="scss" scoped>
  .Circles {
    &__item {
      border-radius: 50%;
      list-style-type: none;
      width: 4rem;
      height: 4rem;
      display: inline-block;
      margin: 0 10px;
      cursor: pointer;

      &--flashit {
        animation: flash linear 1s;
      }
    }
  }



  @keyframes flash {
    0% { opacity: 1; }
    50% { opacity: .1; }
    100% { opacity: 1; }
  }

</style>
