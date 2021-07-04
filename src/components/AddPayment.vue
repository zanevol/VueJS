<template>
  <div class="payment-modal" v-if="showModal">
    <span @click.stop="closeModal">&#10006;</span>
    <form ref="form">
      <input type="text" v-model="date" placeholder="date" />
      <input type="text" v-model="category" placeholder="category" />
      <input type="text" v-model.number="value" placeholder="value" />
    </form>
    <button @click.stop="onClick">Add Data</button>
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      date: "",
      category: "",
      value: null,
      newDate: new Date(),
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    onClick() {
      const { category, value } = this;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value,
      };
      this.$emit("addNewPayment", data);
      this.date = "";
      this.category = "";
      this.value = "";
    },
  },

  computed: {
    getCurrentDate() {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      return new Intl.DateTimeFormat("ru-Ru", options).format(this.newDate);
    },
  },
};
</script> 

<style lang="scss" scoped>
.payment-modal {
  position: absolute;
  width: 350px;
  height: 250px;
  top: 21%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  background: #fff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;

  span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }

  form {
    height: 150px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    input {
      padding: 5px 0 5px 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
    }
  }

  button {
    border: none;
    background: #25a79b;
    padding: 5px 15px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    color: #fff;
    cursor: pointer;
  }
}
</style>