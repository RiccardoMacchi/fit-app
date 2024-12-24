<script>
export default {
  data() {
    return {
      minutes: 0,
      seconds: 0,
      timerInterval: null,
      timerGo: false
    };
  },
  methods: {
    timer() {
      if ((this.minutes > 0 || this.seconds > 0) && !this.timerInterval) {
        let totalSeconds = this.minutes * 60 + this.seconds;

        this.timerGo = true
        this.timerInterval = setInterval(() => {
          if (totalSeconds > 0) {
            totalSeconds--
            this.minutes = Math.floor(totalSeconds / 60)
            this.seconds = totalSeconds % 60
          } else {
            clearInterval(this.timerInterval)
            this.timerInterval = null
            this.timerGo = false
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
      <div v-if="!timerGo">
        <select v-model="minutes" id="minutes">
            <option v-for="minute in 5" :key="minute" :value="minute">{{ minute }}</option>
        </select>
        <select v-model="seconds" id="seconds">
            <option v-for="second in 59" :key="second" :value="second">{{ second }}</option>
        </select>
        <button @click="timer">START</button>
      </div>
      <div v-else>
        <span>{{ getTime }}</span>
      </div>
      </div>
</template>

<style lang="scss" scoped>

#timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  border-radius: 12px;
  background: #303030;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #f5f5f5;
  text-align: center;
}

#timer span {
  font-size: 3.25rem;
  font-weight: bold;
  color: #f5f5f5;
  background: linear-gradient(90deg, #ff4500, #ff6347, #ff7f50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

#timer select {
  font-size: 0.5rem;
  font-weight: bold;
  color: #f5f5f5;
  padding: 10px 6px;
  margin: 2px;
  border: 2px solid #ff4500;
  border-radius: 8px;
  background-color: #242323;
}

#timer button {
  font-weight: bold;
  color: #f5f5f5;
  padding: 10px 25px;
  margin-top: 5px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #ff4500, #ff6347, #ff7f50);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Effetto ombra ridotto */
  cursor: pointer;
}


</style>