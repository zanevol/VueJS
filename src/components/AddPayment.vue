<template>
  <v-card
    class="pa-4 pt-0 text-right"
    v-if="editItem && Object.keys(editItem).length"
  >
    <v-btn fab small plain class="mb-0 mt-2" @click.stop="$emit('closeDialog')"
      ><v-icon>mdi-close</v-icon></v-btn
    >
    <v-text-field
      label="Date"
      v-model="editItem.date"
      class="mt-0 pt-0"
    ></v-text-field>
    <v-text-field label="Category" v-model="editItem.category"></v-text-field>
    <v-text-field label="Value" v-model.number="editItem.value"></v-text-field>
    <v-btn :ripple="false" color="teal" dark @click.stop="savePayment"
      >Save</v-btn
    >
  </v-card>

  <v-card class="pa-4 pt-0 text-right" v-else>
    <v-btn fab small plain class="mb-0 mt-2" @click.stop="$emit('closeDialog')"
      ><v-icon>mdi-close</v-icon></v-btn
    >
    <v-text-field label="Date" v-model="date" class="mt-0 pt-0"></v-text-field>
    <v-text-field label="Category" v-model="category"></v-text-field>
    <v-text-field label="Value" v-model.number="value"></v-text-field>
    <v-btn :ripple="false" color="teal" dark @click.stop="onClick">Add</v-btn>
  </v-card>
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
      this.date = "";
      this.category = "";
      this.value = "";
      this.$emit("closeDialog");
    },
    savePayment() {
      this.editEl({
        date: this.editItem.date,
        category: this.editItem.category,
        value: this.editItem.value,
        id: this.editItem.id,
      });
      this.editItem.date = "";
      this.editItem.category = "";
      this.editItem.value = "";
      this.$emit("closeDialog");
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
  created() {},
};
</script> 
