<template>
  <h2>Add</h2>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Add",
  methods: {
    ...mapActions(["setPaymentsList", "setOpenModal", "setCloseModal"]),
  },
  mounted() {
    this.setOpenModal();
  },
};
</script>

<style>
</style>