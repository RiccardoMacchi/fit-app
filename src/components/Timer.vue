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
  props:{
    time:{
      type: String,
    }
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
            this.setTime()
          }
        }, 1000)
      }
    },
    resetTimer() {
      clearInterval(this.timerInterval)
      this.timerInterval = null
      this.minutes = 0
      this.seconds = 0
      this.timerGo = false
      this.setTime()
    },
    setTime(){
      console.log(this.time)
      if(this.time){
        const newArrayTime = this.time.split("'")
        console.log(newArrayTime)
        this.minutes = parseInt(newArrayTime[0]) || 0
        this.seconds = parseInt(newArrayTime[1]) || 0
      }
    }
  },
  computed: {
    getTime() {
      return `${this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`
    },
  },
  watch: {
    time: {
      handler(newValue) {
        if(!this.timerGo){
          this.setTime()
        }
      },
      immediate: true
    }
  }
};
</script>

<template>
    <div id="timer">
      <div v-if="!timerGo">
        <select v-model="minutes" id="minutes">
            <option :value="0">0</option>
            <option v-for="minute in 5" :key="minute" :value="minute">{{ minute }}</option>
        </select>
        <select v-model="seconds" id="seconds">
            <option :value="0">0</option>
            <option v-for="second in 59" :key="second" :value="second">{{ second }}</option>
        </select>
        <button @click="timer">START</button>
      </div>
      <div class="else-timer" v-else>
        <div class="span-wrapper">
          <span>{{ getTime }}</span>
        </div>
        <button id="stop-timer" @click="resetTimer">STOP</button>
      </div>
      </div>
</template>

<style lang="scss" scoped>

#timer {
  margin: 20px auto;
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

#timer .span-wrapper {
  background-color: #242323;
  padding: 0px 15px;
  border: 2px solid #ff4500;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

#timer span {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff4500, #ff6347, #ff7f50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
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