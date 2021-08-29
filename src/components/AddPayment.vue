<template>
  <div class="payment-modal">
    <span @click.stop="$emit('closeModal')">&#10006;</span>

    <form
      ref="form"
      @submit.prevent="savePayment"
      v-if="editItem && Object.keys(editItem).length"
    >
      <input type="text" v-model="editItem.date" placeholder="date" />
      <input type="text" v-model="editItem.category" placeholder="category" />
      <input type="text" v-model.number="editItem.value" placeholder="value" />
      <button type="submit">Save</button>
    </form>

    <form ref="form" @submit.prevent="onClick" v-else>
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
  props: {
    editItem: Object,
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
    ...mapActions(["setPaymentsList", "editEl"]),
    closeModal() {
      this.showModal = false;
      window.history.length > 0 ? this.$router.go(-1) : this.$router.push("/");
      this.date = "";
      this.category = "";
      this.value = "";
    },
    onClick() {
      const { category, value } = this;
      this.setPaymentsList({
        date: this.date || this.getCurrentDate,
        category,
        value,
        id: Date.now(),
      });
      this.$refs["form"].reset();
      this.date = "";
      this.category = "";
      this.value = "";
      this.activeModal2 = "";
    },
    savePayment() {
      this.editEl({
        date: this.editItem.date,
        category: this.editItem.category,
        value: this.editItem.value,
        id: this.editItem.id,
      });
      this.activeModal = "";
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
    activeModal: {
      get() {
        return this.$store.getters.ACTIVEMODAL;
      },
      set(activeModalName) {
        this.$store.dispatch("setActiveModal", activeModalName);
      },
    },
    activeModal2: {
      get() {
        return this.$store.getters.ACTIVEMODAL2;
      },
      set(activeModalName) {
        this.$store.dispatch("setActiveModal2", activeModalName);
      },
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