<template>
  <div class="calc-block">
    <input type="text" placeholder="op1" v-model.number.trim="operand1" />
    <input type="text" placeholder="op2" v-model.number.trim="operand2" /> =
    {{ sum }}
    <div class="btn-block">
      <button @click.stop="sum = operand1 + operand2">+</button>
      <button @click.stop="sum = operand1 - operand2">-</button>
      <button @click.stop="sum = operand1 * operand2">*</button>
      <button @click.stop="div">/</button>
      <button @click.stop="eventFn">Event</button>
      <button @click.stop="expo">^</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calc",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      sum: 0,
    };
  },
  methods: {
    div() {
      this.sum = this.operand1 / this.operand2;
    },
		
    eventFn() {
      this.sum = (this.operand1 / this.operand2) >> 0;
    },

    expo() {
      this.sum = this.operand1 ** this.operand2;
    },
  },
  computed: {},
};
</script>


<style lang="scss" scoped>
.calc-block {
  width: 500px;
  height: 500px;
  margin-top: 200px;
}
</style>