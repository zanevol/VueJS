<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">My personal cost</h1>
      <Button/>
    </header>
    <main>
      <Payments
        :list="paginatedList"
        :currentPage="currentPage"
        :sizePage="sizePage"
      />
      <Pagination
        :count-lists="countLists"
        :current-page="currentPage"
        :size="sizePage"
        @changeSizeRecords="changeSizeRecords"
        @changeCurrentPage="changeCurrentPage"
      />
    </main>
    <AddPayment/>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "./components/Button.vue";
import Pagination from "./components/Pagination.vue";
import Payments from "./components/PaymentsDisplay.vue";
const AddPayment = () => import("./components/AddPayment.vue");

export default {
  components: { Payments, AddPayment, Button, Pagination },
  data() {
    return {
      //JSON.parse(localStorage.getItem("paymentsList") || [])

      currentPage: 1,
      sizePage: 10,
    };
  },

  methods: {
    ...mapActions(["fetchPaymentsList"]),
    changeCurrentPage(page) {
      this.currentPage = page;
    },

    changeSizeRecords(records) {
      this.currentPage = 1;
      this.sizePage = records;
    },
  },

  computed: {
    ...mapGetters(["allPaymentsList"]),
    paginatedList() {
      let start = this.currentPage * this.sizePage - this.sizePage;
      let end = start + this.sizePage;
      let paginatedList = [];
      if (this.allPaymentsList) {
        paginatedList = this.allPaymentsList.slice(start, end);
      }
      return paginatedList;
    },

    countLists() {
      return this.allPaymentsList ? this.allPaymentsList.length : 0;
    },
  },

};
</script>

<style lang="scss">
body {
  width: 1140px;
  height: 100%;
  margin: auto;
  padding: 0;
}

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
}

.header {
  margin: 0;
  padding-top: 50px;

  &-title {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
  }
}
</style>
