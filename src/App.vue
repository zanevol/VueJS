<template>
  <div id="app">
    <div class="wrapper">
      <div class="inputs">
        <input
          class="value"
          name="operand1"
          v-model.number="operand1"
          placeholder="0"
        />
        <input
          class="value"
          name="operand2"
          v-model.number="operand2"
          placeholder="0"
        />
        <span class="result">=</span>
        <div class="error" v-if="error">{{ error }}</div>
        <input v-model.number="result" readonly class="calc" v-else />
      </div>
      <div class="buttons">
        <div
          class="btn"
          v-for="(button, idx) in buttons"
          :key="idx"
          :name="button"
          @click.stop="calculate(button)"
        >
          {{ button }}
        </div>
      </div>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: "Calc",
  data() {
    return {
      result: "",
      operand1: null,
      operand2: null,
      error: "",
      buttons: ["+", "-", "/", "*", "C"],
    };
  },
  methods: {
    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        case "+":
          this.summ();
          break;
        case "-":
          this.sub();
          break;
        case "/":
          this.div();
          break;
        case "*":
          this.multi();
          break;
        case "C":
          this.reset();
          break;
      }
    },
    multi() {
      this.result = this.operand1 * this.operand2;
    },
    sub() {
      this.result = this.operand1 - this.operand2;
      this.fibResult = this.fib1 - this.fib2;
    },
    summ() {
      this.result = this.operand1 + this.operand2;
    },
    div() {
      const { operand1, operand2 } = this;
      operand2 === 0
        ? (this.error = "На ноль делить нельзя")
        : (this.result = operand1 / operand2);
    },
    reset() {
      this.operand1 = this.operand2 = "";
      this.result = "";
    },
  },
  computed: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  background: url("./assets/table.jpeg") no-repeat center/cover;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
}
.wrapper {
  width: 320px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 20px;

  .inputs {
    margin-bottom: 10px;
    .error {
      height: 30px;
      line-height: 30px;
      color: tomato;
      font-size: 26px;
    }

    .value {
      width: 95%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      font-size: 30px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      margin-bottom: 5px;
      padding-left: 14px;
      background: transparent;
      outline: none;

      &::placeholder {
        color: #fff;
      }
    }

    .result {
      color: #fff;
      font-size: 30px;
    }
  }

  .calc {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 95%;
    height: 50px;
    color: #fff;
    background: transparent;
    font-size: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    padding-left: 14px;
    outline: none;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .btn {
      height: 50px;
      width: 50px;
      border: 1px solid transparent;
      line-height: 50px;
      transition: all 0.3s;
      border-color: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      color: rgba(255, 255, 255, 0.2);

      &:hover {
        background: rgba(255, 255, 255, 0.5);
        border-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        cursor: pointer;
        transition: all 0.25s;
      }
    }
  }
}
</style>
