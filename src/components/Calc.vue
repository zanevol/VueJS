<template>
  <div class="calc-block">
    <div class="input-block">
      <input
        type="text"
        placeholder="op1"
        :disabled="radio1 === false"
        v-model.number.trim="operand1"
      />
      <input
        type="text"
        placeholder="op2"
        :disabled="radio2 === false"
        v-model.number.trim="operand2"
      />
      = {{ result }} - {{ fibResult }}
    </div>

    <!-- <div class="fio">{{ fio }}</div> -->
    <div class="error" v-if="error">Ошибка: {{ error }}</div>
    <!-- <div class="strange-message">
      <template v-if="result < 0">Число меньше 0</template>
      <template v-else-if="result < 100">Число меньше 100</template>
      <template v-else>Число больше 100</template>
    </div> -->

    <div class="buttons">
      <button
        v-for="(button, idx) in buttons"
        :key="idx"
        :title="button"
        :disabled="operand2 === 0"
        @click.stop="calculate(button)"
      >
        {{ button }}
      </button>
    </div>
    <label class="ch-label">
      <input
        type="checkbox"
        class="ch-box"
        @change="showBtnBlock = !showBtnBlock"
      />
      Отобразить экранную клавиатуру
    </label>

    <div class="btn-block" v-if="showBtnBlock">
      <button
        class="collection"
        :value="collect"
        @click.stop="changeInputValue(collect)"
        v-for="(collect, collectIdx) in collection"
        :key="collectIdx"
      >
        {{ collect }}
      </button>

      <div class="radio-block">
        <label>
          <input
            type="radio"
            ref="input1"
            v-model="radio1"
            @change="changeRadio1"
            name="radio"
          />
          Операнд 1
        </label>
        <label>
          <input
            type="radio"
            ref="input2"
            v-model="radio2"
            @change="changeRadio2"
            name="radio"
          />
          Операнд 2
        </label>
      </div>
    </div>

    <!-- <div class="logs">
      {{ logs }}
    </div> -->
    <!-- <div class="btn-block">
      <button @click.stop="calculate('+')">+</button>
      <button @click.stop="calculate('-')">-</button>
      <button @click.stop="calculate('*')">*</button>
      <button @click.stop="calculate('/')">/</button>
      <button @click.stop="calculate('**')">Event</button>
      <button @click.stop="calculate('')">^</button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Calc",
  data() {
    return {
      firstName: "First",
      lastName: "Last",
      operand1: 0,
      operand2: 0,
      radio1: false,
      radio2: false,
      result: 0,
      error: "",
      buttons: ["+", "-", "*", "/"],
      collection: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "←"],
      logs: {},
      fibResult: 0,
      showBtnBlock: false,
    };
  },
  watch: {
    result: function (newValue, oldValue) {
      console.log(newValue, oldValue);
    },
    fib1: function (newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    changeInputValue(btnVal) {
      if (this.$refs["input1"].checked) {
        this.operand1 = btnVal;
        if (btnVal === "←") {
          this.operand1 = "";
        }
      }
      if (this.$refs["input2"].checked) {
        this.operand2 = btnVal;
        if (btnVal === "←") {
          this.operand2 = "";
        }
      }
    },

    changeRadio1() {
      if (this.radio1 === false) {
        this.radio1 = true;
      } else {
        this.radio2 = false;
      }
    },

    changeRadio2() {
      if (this.radio2 === false) {
        this.radio2 = true;
      } else {
        this.radio1 = false;
      }
    },

    fib(n) {
      return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
    },

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
      }
      const key = Date.now();
      const value = `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;
      this.$set(this.logs, key, value);
    },

    // calculate(op) {
    //   const calcOperation = {
    //     "+": () => this.operand1 + this.operand2,
    //     "-": () => this.operand1 - this.operand2,
    //     "/": () => this.operand1 / this.operand2,
    //     "*": () => this.operand1 * this.operand2,
    //   };
    // 	this.result = calcOperation[op]();
    // },

    multi() {
      this.result = this.operand1 * this.operand2;
    },

    sub() {
      this.result = this.operand1 - this.operand2;
      this.fibResult = this.fib1 - this.fib2;
    },

    summ() {
      this.result = this.operand1 + this.operand2;
      // this.fibResult = this.fib(this.operand1) + this.fib(this.operand2);
      this.fibResult = this.fib1 + this.fib2;
    },

    div() {
      const { operand1, operand2 } = this;
      operand2 === 0
        ? (this.error = "На ноль делить нельзя")
        : (this.result = operand1 / operand2);
    },

    eventFn() {
      this.result = (this.operand1 / this.operand2) >> 0;
    },

    expo() {
      this.result = this.operand1 ** this.operand2;
    },
  },
  computed: {
    fio() {
      return `${this.firstName} ${this.lastName}`;
    },

    fib1() {
      return this.fib(this.operand1);
    },
    fib2() {
      return this.fib(this.operand2);
    },
  },
};
</script>


<style lang="scss" scoped>
.calc-block {
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.error {
  color: tomato;
}

.ch-label {
  display: flex;
  align-items: center;
  margin: 25px 0;
}

.radio-block {
  margin-top: 25px;
}
</style>name="radio"