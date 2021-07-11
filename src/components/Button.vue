<template>
  <button class="add-payment" @click.stop="showActiveModal">
    Add Payment +
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Button",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchOpenModal"]),
    showActiveModal() {
      this.fetchOpenModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.add-payment {
  padding: 10px 25px;
  margin-bottom: 40px;
  background: #25a79b;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>