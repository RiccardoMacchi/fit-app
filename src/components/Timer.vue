<script>
export default {
  data() {
    return {
      minutes: 0,
      seconds: 0,
      timerInterval: null,
    };
  },
  methods: {
    timer() {
      if ((this.minutes > 0 || this.seconds > 0) && !this.timerInterval) {
        let totalSeconds = this.minutes * 60 + this.seconds;

        this.timerInterval = setInterval(() => {
          if (totalSeconds > 0) {
            totalSeconds--
            this.minutes = Math.floor(totalSeconds / 60)
            this.seconds = totalSeconds % 60
          } else {
            clearInterval(this.timerInterval)
            this.timerInterval = null
          }
        }, 1000)
      }
    },
    resetTimer() {
      clearInterval(this.timerInterval)
      this.timerInterval = null
      this.minutes = 0
      this.seconds = 0
    },
  },
  computed: {
    getTime() {
      return `${this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`
    },
  },
};
</script>

<template>
    <div id="timer">
        <select v-model="minutes" id="minutes">
            <option v-for="minute in 60" :key="minute" :value="minute">{{ minute }}</option>
        </select>
        <select v-model="seconds" id="seconds">
            <option v-for="second in 60" :key="second" :value="second">{{ second }}</option>
        </select>
        <button @click="timer">START</button>
        <span>{{ getTime }}</span>
      </div>
</template>