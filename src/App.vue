<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">My personal cost</h1>
      <Button @showActiveModal="showActiveModal" />
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
    <AddPayment
      :showModal="showModal"
      @closeModal="closeModal"
      @addNewPayment="addData"
    />
    <router-view />
  </div>
</template>

<script>
import Button from "./components/Button.vue";
import Pagination from "./components/Pagination.vue";
import Payments from "./components/PaymentsDisplay.vue";
const AddPayment = () => import("./components/AddPayment.vue");

export default {
  components: { Payments, AddPayment, Button, Pagination },
  data() {
    return {
      paymentsList: JSON.parse(localStorage.getItem("paymentsList") || []),
      showModal: false,
      currentPage: 1,
      sizePage: 10,
    };
  },

  methods: {
    changeCurrentPage(page) {
      this.currentPage = page;
    },

    changeSizeRecords(records) {
      this.currentPage = 1;
      this.sizePage = records;
    },

    addData(data) {
      this.paymentsList.push(data);
      localStorage.setItem("paymentsList", JSON.stringify(this.paymentsList));
      this.showModal = false;
    },
    showActiveModal() {
      this.showModal === true
        ? (this.showModal = false)
        : (this.showModal = true);
    },
    closeModal() {
      this.showModal = false;
    },
  },

  computed: {
    paginatedList() {
      let start = this.currentPage * this.sizePage - this.sizePage;
      let end = start + this.sizePage;
      let paginatedList = [];
      if (this.paymentsList) {
        paginatedList = this.paymentsList.slice(start, end);
      }
      return paginatedList;
    },

    countLists() {
      return this.paymentsList ? this.paymentsList.length : 0;
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
