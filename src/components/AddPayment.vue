<template>
  <div class="payment-modal" v-if="$store.state.showModal">
    <span @click.stop="closeModal">&#10006;</span>

    <form ref="form" @submit.prevent="onClick">
      <input type="text" v-model="date" placeholder="date" />
      <input type="text" v-model="category" placeholder="category" />
      <input type="text" v-model.number="value" placeholder="value" />
      <button type="submit">Add Data</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddPayment",
  data() {
    return {
      date: "",
      category: "",
      value: null,
      newDate: new Date(),
    };
  },
  methods: {
    ...mapActions(["setPaymentsList", "setCloseModal", "setOpenModal"]),
    closeModal() {
      this.setCloseModal();
      this.$refs["form"].reset();
      window.history.length > 0 ? this.$router.go(-1) : this.$router.push("/");
    },
    onClick() {
      const { category, value } = this;
      this.setPaymentsList({
        date: this.date || this.getCurrentDate,
        category,
        value,
      });
      this.$refs["form"].reset();
      this.setCloseModal();
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
    getQueryFromRoute() {
      return this.$route.query?.value ?? null;
    },
    getCategoryParamsFromRoute() {
      return this.$route.params?.category ?? null;
    },
  },
  created() {
    if (this.getQueryFromRoute || this.getCategoryParamsFromRoute) {
      this.category = this.getCategoryParamsFromRoute;
      this.value = this.getQueryFromRoute;
    }
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
    height: 250px;
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